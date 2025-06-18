import type { Express } from "express";
import { createServer, type Server } from "http";
import { eq } from "drizzle-orm";
import { db } from "./db";
import { squads, squadSelections, squadAdvice } from "@shared/schema";
import { northHarbourPlayers } from './northHarbourPlayers';
import { geminiAnalyst, type MatchAnalysisRequest } from "./geminiAnalysis";

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
        userId: 'user-1' // Replace with actual user ID from auth
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
      const userSquads = await db.select().from(squads).where(eq(squads.userId, 'user-1'));
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
        .where(eq(squadSelections.squadId, parseInt(squadId)))
        .where(eq(squadSelections.playerId, playerId));

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
          type: advice.type,
          message: advice.message,
          priority: advice.priority
        });
      }

    } catch (error) {
      console.error('Error generating squad advice:', error);
    }
  }

  const httpServer = createServer(app);
  return httpServer;
}