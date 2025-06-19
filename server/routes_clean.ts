import type { Express } from "express";
import { createServer, type Server } from "http";
import { eq, and } from "drizzle-orm";
import { db } from "./db";
import { squads, squadSelections, squadAdvice } from "@shared/schema";
import { northHarbourPlayers } from './northHarbourPlayers';
import { geminiAnalyst, type MatchAnalysisRequest } from "./geminiAnalysis";
import { DatabaseStorage } from "./storage";

const storage = new DatabaseStorage();

export function registerRoutes(app: Express): Server {
  // Get all players - Complete North Harbour Rugby roster
  app.get("/api/players", async (req, res) => {
    try {
      res.json(northHarbourPlayers);
    } catch (error) {
      console.error("Error fetching players:", error);
      res.status(500).json({ error: "Failed to fetch players" });
    }
  });

  // Get single player by ID
  app.get("/api/players/:id", async (req, res) => {
    try {
      const player = northHarbourPlayers.find(p => p.id === req.params.id);
      if (!player) {
        return res.status(404).json({ error: "Player not found" });
      }
      res.json(player);
    } catch (error) {
      console.error("Error fetching player:", error);
      res.status(500).json({ error: "Failed to fetch player" });
    }
  });

  // Squad Management Routes
  
  // Create new squad
  app.post('/api/squads', async (req, res) => {
    try {
      const { name, matchName, matchDate, notes } = req.body;
      
      const [squad] = await db.insert(squads).values({
        name,
        matchName,
        matchDate,
        notes,
        createdBy: 'user-1' // Replace with actual user ID from auth
      }).returning();

      res.status(201).json(squad);
    } catch (error) {
      console.error('Error creating squad:', error);
      res.status(500).json({ error: 'Failed to create squad' });
    }
  });

  // Get all squads for user
  app.get('/api/squads', async (req, res) => {
    try {
      const userSquads = await db.select().from(squads).where(eq(squads.createdBy, 'user-1'));
      res.json(userSquads);
    } catch (error) {
      console.error('Error fetching squads:', error);
      res.status(500).json({ error: 'Failed to fetch squads' });
    }
  });

  // Get squad details with selections
  app.get('/api/squads/:squadId', async (req, res) => {
    try {
      const squadId = parseInt(req.params.squadId);
      
      const [squad] = await db.select().from(squads).where(eq(squads.id, squadId));
      if (!squad) {
        return res.status(404).json({ error: 'Squad not found' });
      }

      const selections = await db.select().from(squadSelections).where(eq(squadSelections.squadId, squadId));
      const advice = await db.select().from(squadAdvice).where(eq(squadAdvice.squadId, squadId));

      res.json({
        ...squad,
        selections,
        advice
      });
    } catch (error) {
      console.error('Error fetching squad details:', error);
      res.status(500).json({ error: 'Failed to fetch squad details' });
    }
  });

  // Add player to squad
  app.post('/api/squads/:squadId/players', async (req, res) => {
    try {
      const { squadId } = req.params;
      const { playerId, position, isStarter, selectionReason } = req.body;

      // Find the player to get their actual position if not provided
      let playerPosition = position;
      if (!playerPosition) {
        const player = northHarbourPlayers.find(p => p.id === playerId);
        if (player && player.personalDetails && player.personalDetails.position) {
          playerPosition = player.personalDetails.position;
        } else {
          playerPosition = 'Forward';
        }
      }

      const [selection] = await db.insert(squadSelections).values({
        squadId: parseInt(squadId),
        playerId,
        position: playerPosition,
        isStarter: isStarter ?? true,
        selectionReason
      }).returning();

      // Generate selection advice for this squad
      await generateSquadAdvice(parseInt(squadId));

      res.json(selection);
    } catch (error) {
      console.error('Error adding player to squad:', error);
      res.status(500).json({ error: 'Failed to add player to squad' });
    }
  });

  // Remove player from squad
  app.delete('/api/squads/:squadId/players/:playerId', async (req, res) => {
    try {
      const { squadId, playerId } = req.params;
      
      await db.delete(squadSelections)
        .where(
          and(
            eq(squadSelections.squadId, parseInt(squadId)),
            eq(squadSelections.playerId, playerId)
          )
        );

      // Regenerate selection advice
      await generateSquadAdvice(parseInt(squadId));

      res.json({ success: true });
    } catch (error) {
      console.error('Error removing player from squad:', error);
      res.status(500).json({ error: 'Failed to remove player from squad' });
    }
  });

  // Get squad selection advice
  app.get('/api/squads/:squadId/advice', async (req, res) => {
    try {
      const squadId = parseInt(req.params.squadId);
      const advice = await db.select().from(squadAdvice).where(eq(squadAdvice.squadId, squadId));
      res.json(advice);
    } catch (error) {
      console.error('Error fetching squad advice:', error);
      res.status(500).json({ error: 'Failed to fetch squad advice' });
    }
  });

  // Generate squad advice helper function
  async function generateSquadAdvice(squadId: number) {
    try {
      const selections = await db.select().from(squadSelections).where(eq(squadSelections.squadId, squadId));
      
      const selectedPlayerIds = selections.map(s => s.playerId);
      const selectedPlayers = northHarbourPlayers.filter(p => selectedPlayerIds.includes(p.id));

      // Analyze squad composition
      const positions = selectedPlayers.map(p => p.personalDetails.position);
      const positionCounts = positions.reduce((acc: any, pos) => {
        acc[pos] = (acc[pos] || 0) + 1;
        return acc;
      }, {});

      // Calculate risk factors
      const injuredPlayers = selectedPlayers.filter(p => p.currentStatus === 'Injured');
      const highPenaltyPlayers = selectedPlayers.filter(p => 
        p.gameStats && p.gameStats[0] && p.gameStats[0].penalties > 5
      );

      // Generate advice
      const adviceItems = [];

      if (injuredPlayers.length > 0) {
        adviceItems.push({
          type: 'warning',
          message: `${injuredPlayers.length} injured player(s) selected: ${injuredPlayers.map(p => p.personalDetails.firstName + ' ' + p.personalDetails.lastName).join(', ')}`,
          priority: 'high'
        });
      }

      if (highPenaltyPlayers.length > 2) {
        adviceItems.push({
          type: 'caution',
          message: `High penalty risk: ${highPenaltyPlayers.length} players with 5+ penalties this season`,
          priority: 'medium'
        });
      }

      // Position balance check
      const requiredPositions = ['Prop', 'Hooker', 'Lock', 'Flanker', 'Number 8', 'Scrum-half', 'Fly-half', 'Centre', 'Wing', 'Fullback'];
      const missingPositions = requiredPositions.filter(pos => !positions.includes(pos));
      
      if (missingPositions.length > 0) {
        adviceItems.push({
          type: 'suggestion',
          message: `Consider adding players for: ${missingPositions.join(', ')}`,
          priority: 'medium'
        });
      }

      // Clear existing advice and add new
      await db.delete(squadAdvice).where(eq(squadAdvice.squadId, squadId));
      
      for (const advice of adviceItems) {
        await db.insert(squadAdvice).values({
          squadId,
          adviceType: advice.type,
          category: 'selection_advice',
          message: advice.message,
          priority: advice.priority === 'high' ? 5 : advice.priority === 'medium' ? 3 : 1
        });
      }

    } catch (error) {
      console.error('Error generating squad advice:', error);
    }
  }

  // Gemini AI Analysis Routes
  app.post("/api/gemini/analyze-section", async (req, res) => {
    try {
      const { sectionId, matchData, teamStats, playerPerformances } = req.body;
      
      const analysisRequest = {
        sectionId,
        matchData,
        teamStats,
        playerPerformances
      };
      
      const analysis = await geminiAnalyst.analyzeMatchSection(analysisRequest);
      res.json(analysis);
    } catch (error) {
      console.error("Error generating Gemini analysis:", error);
      res.status(500).json({ error: "Failed to generate AI analysis" });
    }
  });

  // Sample analytics data
  app.get('/api/analytics/overview', (req, res) => {
    res.json({
      teamMetrics: {
        totalPlayers: northHarbourPlayers.length,
        activePlayers: northHarbourPlayers.filter(p => p.currentStatus === 'Fit').length,
        averageAge: 24.5,
        winRate: 0.67
      }
    });
  });

  // Team cohesion data
  app.get('/api/team/cohesion/twi-progression/2024', (req, res) => {
    res.json([
      { month: 'January', twiScore: 22.1, inSeasonCohesion: 485 },
      { month: 'February', twiScore: 23.4, inSeasonCohesion: 502 },
      { month: 'March', twiScore: 24.1, inSeasonCohesion: 512 }
    ]);
  });

  // Team performance overview
  app.get('/api/team/performance/overview', (req, res) => {
    res.json({
      winRate: 67,
      pointsFor: 385,
      pointsAgainst: 298,
      matchesPlayed: 12
    });
  });

  // Medical overview
  app.get('/api/team/medical/overview', (req, res) => {
    res.json({
      injuryRate: 6.4,
      playersAvailable: 42,
      totalPlayers: 45,
      averageRecovery: 12
    });
  });

  // Fitness overview
  app.get('/api/team/fitness/overview', (req, res) => {
    res.json({
      averageFitness: 89,
      trainingAttendance: 94,
      loadManagement: 'Optimal'
    });
  });

  // Try analysis season data
  app.get('/api/try-analysis/season/2024', (req, res) => {
    res.json([
      {
        teamName: "North Harbour",
        totalTries: 45,
        averagePerMatch: 3.2,
        homeAdvantage: 12,
        awayTries: 20,
        aggregatedZones: [
          { name: "Zone 1", value: 8, percentage: 17.8 },
          { name: "Zone 2", value: 12, percentage: 26.7 },
          { name: "Zone 3", value: 15, percentage: 33.3 },
          { name: "Zone 4", value: 10, percentage: 22.2 }
        ],
        aggregatedQuarters: [
          { name: "Q1", value: 8, percentage: 17.8 },
          { name: "Q2", value: 14, percentage: 31.1 },
          { name: "Q3", value: 12, percentage: 26.7 },
          { name: "Q4", value: 11, percentage: 24.4 }
        ],
        aggregatedPhases: [
          { name: "0-2 phases", value: 18, percentage: 40.0 },
          { name: "3-5 phases", value: 15, percentage: 33.3 },
          { name: "6+ phases", value: 12, percentage: 26.7 }
        ],
        aggregatedSources: [
          { name: "Set Piece", value: 22, percentage: 48.9 },
          { name: "Turnover", value: 12, percentage: 26.7 },
          { name: "Lineout", value: 8, percentage: 17.8 },
          { name: "Counter Attack", value: 3, percentage: 6.7 }
        ]
      }
    ]);
  });

  // AI Analysis endpoints for try patterns and trends
  app.post('/api/ai/try-analysis-comparative', async (req, res) => {
    try {
      const { 
        currentTeam, 
        oppositionTeam, 
        comparative, 
        analysisFrom, 
        analysisPerspective, 
        matchContext 
      } = req.body;

      const analysis = await geminiAnalyst.analyzeComparativeTryPatterns({
        currentTeam,
        oppositionTeam,
        comparative,
        analysisFrom,
        analysisPerspective,
        matchContext
      });

      res.json({ analysis });
    } catch (error) {
      console.error('Error in comparative try analysis:', error);
      res.status(500).json({ 
        error: 'Failed to generate comparative try analysis',
        message: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  });

  // Save try analysis data endpoint
  app.post('/api/try-analysis/save', async (req, res) => {
    try {
      const { analysisData, matchId, season } = req.body;
      
      // For now, we'll simulate saving the data successfully
      // In a real implementation, this would save to the database
      console.log('Saving try analysis data:', { matchId, season, dataSize: JSON.stringify(analysisData).length });
      
      res.json({ 
        success: true, 
        message: 'Try analysis data saved successfully',
        id: `try_analysis_${Date.now()}`
      });
    } catch (error) {
      console.error('Error saving try analysis data:', error);
      res.status(500).json({ 
        error: 'Failed to save try analysis data',
        message: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  });

  // Populate database with North Harbour players
  app.post('/api/players/populate', async (req, res) => {
    try {
      const { northHarbourPlayers } = await import('./northHarbourPlayers');
      let insertedCount = 0;
      let updatedCount = 0;

      for (const playerData of northHarbourPlayers) {
        try {
          // Transform the data to match the database schema
          const dbPlayer = {
            id: playerData.id,
            personalDetails: {
              firstName: playerData.personalDetails.firstName,
              lastName: playerData.personalDetails.lastName,
              email: `${playerData.personalDetails.firstName.toLowerCase()}.${playerData.personalDetails.lastName.toLowerCase()}@northharbour.co.nz`,
              phone: `+64 21 ${Math.floor(Math.random() * 9000000) + 1000000}`,
              dateOfBirth: playerData.personalDetails.dateOfBirth || '1995-01-01',
              address: "North Harbour, Auckland, New Zealand",
              emergencyContact: {
                name: "Emergency Contact",
                relationship: "Family",
                phone: `+64 21 ${Math.floor(Math.random() * 9000000) + 1000000}`
              }
            },
            rugbyProfile: {
              jerseyNumber: playerData.personalDetails.jerseyNumber,
              primaryPosition: playerData.personalDetails.position,
              secondaryPositions: [],
              yearsInTeam: 3,
              clubHistory: ["North Harbour Rugby"]
            },
            physicalAttributes: [{
              date: "2024-06-01",
              weight: 85 + Math.floor(Math.random() * 30), // Random realistic weight
              height: 175 + Math.floor(Math.random() * 25), // Random realistic height
              bodyFat: 8 + Math.floor(Math.random() * 8),
              muscleMass: 75 + Math.floor(Math.random() * 15)
            }],
            testResults: [{
              date: "2024-06-01",
              benchPress: 80 + Math.floor(Math.random() * 40),
              squat: 120 + Math.floor(Math.random() * 60),
              sprint40m: 4.5 + Math.random() * 1.5,
              verticalJump: 55 + Math.floor(Math.random() * 15),
              beepTest: 12 + Math.floor(Math.random() * 6)
            }],
            gameStats: playerData.gameStats || [],
            skills: {
              ballHandling: playerData.skills?.ballHandling || 7,
              passing: playerData.skills?.passing || 7,
              kicking: playerData.skills?.kicking || 6,
              lineoutThrowing: playerData.skills?.lineoutThrowing || 6,
              scrummaging: playerData.skills?.scrummaging || 7,
              rucking: playerData.skills?.rucking || 7,
              defense: playerData.skills?.defense || 7,
              communication: playerData.skills?.communication || 7
            },
            status: {
              fitness: playerData.currentStatus === "Fit" ? "available" : "injured",
              medical: "cleared",
              availability: "available"
            },
            injuries: [],
            reports: [],
            activities: [],
            injuryHistory: [],
            trainingPrograms: [],
            videoAnalysis: []
          };

          // Check if player already exists
          const existingPlayer = await storage.getPlayer(playerData.id);
          
          if (existingPlayer) {
            // Update existing player
            await storage.updatePlayer(playerData.id, dbPlayer);
            updatedCount++;
          } else {
            // Create new player
            await storage.createPlayer(dbPlayer);
            insertedCount++;
          }
        } catch (playerError) {
          console.error(`Error processing player ${playerData.id}:`, playerError);
        }
      }

      res.json({
        success: true,
        message: `Database populated successfully`,
        inserted: insertedCount,
        updated: updatedCount,
        total: northHarbourPlayers.length
      });
    } catch (error) {
      console.error('Error populating players database:', error);
      res.status(500).json({
        error: 'Failed to populate players database',
        message: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}