import type { Express } from "express";
import { storage } from "./storage";
import { googleSheetsService } from "./googleSheets";
import { generateCleanPlayersCSV, generateMatchStatsCSV } from "./cleanCSV";

export function registerRoutes(app: Express) {
  // Get all players
  app.get("/api/players", async (req, res) => {
    try {
      const players = await storage.getPlayers();
      res.json(players);
    } catch (error) {
      console.error("Error fetching players:", error);
      res.status(500).json({ error: "Failed to fetch players" });
    }
  });

  // Get player by ID
  app.get("/api/players/:id", async (req, res) => {
    try {
      const player = await storage.getPlayer(req.params.id);
      if (!player) {
        return res.status(404).json({ error: "Player not found" });
      }
      res.json(player);
    } catch (error) {
      console.error("Error fetching player:", error);
      res.status(500).json({ error: "Failed to fetch player" });
    }
  });

  // Create new player
  app.post("/api/players", async (req, res) => {
    try {
      const player = await storage.createPlayer(req.body);
      res.status(201).json(player);
    } catch (error) {
      console.error("Error creating player:", error);
      res.status(500).json({ error: "Failed to create player" });
    }
  });

  // Update player
  app.patch("/api/players/:id", async (req, res) => {
    try {
      const updatedPlayer = await storage.updatePlayer(req.params.id, req.body);
      if (!updatedPlayer) {
        return res.status(404).json({ error: "Player not found" });
      }
      res.json(updatedPlayer);
    } catch (error) {
      console.error("Error updating player:", error);
      res.status(500).json({ error: "Failed to update player" });
    }
  });

  // Google Sheets Integration Routes
  
  // Sync player data from Google Sheets
  app.post("/api/sheets/sync-players", async (req, res) => {
    try {
      const { spreadsheetId, range = 'Players!A2:N1000' } = req.body;
      
      if (!spreadsheetId) {
        return res.status(400).json({ error: "Spreadsheet ID is required" });
      }

      const playerData = await googleSheetsService.getPlayerData(spreadsheetId, range);
      
      // Transform Google Sheets data to match your player schema
      const transformedPlayers = playerData.map(row => ({
        personalDetails: {
          firstName: row.name.split(' ')[0] || '',
          lastName: row.name.split(' ').slice(1).join(' ') || '',
          dateOfBirth: '1990-01-01', // You can add this to your spreadsheet
          height: row.height,
          weight: row.weight,
          position: row.position,
          jerseyNumber: row.jerseyNumber,
        },
        physicalAttributes: [{
          date: new Date().toISOString().split('T')[0],
          weight: row.weight,
          bodyFat: 12, // Add to spreadsheet if needed
          leanMass: row.weight * 0.88,
        }],
        gameStats: [{
          date: row.lastMatch,
          opponent: 'vs Opponent',
          tries: 0,
          assists: 0,
          tackles: row.tackles,
          missedTackles: 0,
          carries: row.carries,
          metersGained: row.gpsDistance,
          passAccuracy: row.passAccuracy,
          lineoutSuccess: 85,
          scrumSuccess: 90,
        }],
        currentStatus: row.injuryStatus.toLowerCase().includes('injured') ? 'injured' : 'available',
      }));

      // Save transformed data to database
      const savedPlayers = [];
      for (const playerData of transformedPlayers) {
        try {
          const player = await storage.createPlayer(playerData);
          savedPlayers.push(player);
        } catch (error) {
          console.warn('Player may already exist, skipping:', playerData.personalDetails?.firstName);
        }
      }

      res.json({
        success: true,
        message: `Synced ${savedPlayers.length} players from Google Sheets`,
        playersImported: savedPlayers.length,
        totalRows: playerData.length
      });
    } catch (error) {
      console.error("Error syncing player data:", error);
      res.status(500).json({ error: "Failed to sync player data from Google Sheets" });
    }
  });

  // Sync match data from Google Sheets
  app.post("/api/sheets/sync-matches", async (req, res) => {
    try {
      const { spreadsheetId, range = 'Matches!A2:N1000' } = req.body;
      
      if (!spreadsheetId) {
        return res.status(400).json({ error: "Spreadsheet ID is required" });
      }

      const matchData = await googleSheetsService.getMatchData(spreadsheetId, range);
      
      res.json({
        success: true,
        message: `Retrieved ${matchData.length} match records`,
        data: matchData
      });
    } catch (error) {
      console.error("Error syncing match data:", error);
      res.status(500).json({ error: "Failed to sync match data from Google Sheets" });
    }
  });

  // Get real-time data from Google Sheets without saving to database
  app.get("/api/sheets/preview/:spreadsheetId", async (req, res) => {
    try {
      const { spreadsheetId } = req.params;
      const { range = 'Players!A2:N20' } = req.query;
      
      const playerData = await googleSheetsService.getPlayerData(spreadsheetId, range as string);
      
      res.json({
        success: true,
        preview: playerData.slice(0, 10), // Show first 10 rows as preview
        totalRows: playerData.length
      });
    } catch (error) {
      console.error("Error previewing spreadsheet data:", error);
      res.status(500).json({ error: "Failed to preview spreadsheet data" });
    }
  });

  // Sync all data types from Google Sheets
  app.post("/api/sheets/sync-all", async (req, res) => {
    try {
      const { spreadsheetId } = req.body;
      
      if (!spreadsheetId) {
        return res.status(400).json({ error: "Spreadsheet ID is required" });
      }

      const allData = await googleSheetsService.syncAllData(spreadsheetId);
      
      res.json({
        success: true,
        message: "Successfully synced all data from Google Sheets",
        data: {
          players: allData.players.length,
          matches: allData.matches.length,
          training: allData.training.length,
          medical: allData.medical.length,
          syncTime: allData.syncTime
        }
      });
    } catch (error) {
      console.error("Error syncing all data:", error);
      res.status(500).json({ error: "Failed to sync all data from Google Sheets" });
    }
  });

  // CSV Export Routes for Google Sheets Integration
  
  // Download player data template as CSV
  app.get("/api/export/players-template", (req, res) => {
    try {
      const csv = generateCleanPlayersCSV();
      
      res.setHeader('Content-Type', 'text/csv');
      res.setHeader('Content-Disposition', 'attachment; filename="north_harbour_rugby_players_template.csv"');
      res.send(csv);
    } catch (error) {
      console.error("Error generating players CSV:", error);
      res.status(500).json({ error: "Failed to generate CSV template" });
    }
  });

  // Download match statistics template as CSV
  app.get("/api/export/matches-template", (req, res) => {
    try {
      const csv = generateMatchStatsCSV();
      
      res.setHeader('Content-Type', 'text/csv');
      res.setHeader('Content-Disposition', 'attachment; filename="north_harbour_rugby_matches_template.csv"');
      res.send(csv);
    } catch (error) {
      console.error("Error generating matches CSV:", error);
      res.status(500).json({ error: "Failed to generate CSV template" });
    }
  });

  // Seed database with sample data
  app.post("/api/seed", async (req, res) => {
    try {
      // Check if players already exist
      const existingPlayers = await storage.getPlayers();
      if (existingPlayers.length > 0) {
        return res.json({ message: "Database already contains players" });
      }

      // Sample player data for James Mitchell
      const samplePlayer = {
        id: "james-mitchell",
        personalDetails: {
          firstName: "James",
          lastName: "Mitchell",
          dateOfBirth: "2001-03-15",
          email: "james.mitchell@northharbour.rugby",
          phone: "+64 21 123 4567",
          address: "123 Rugby Street, Auckland",
          emergencyContact: {
            name: "Sarah Mitchell",
            relationship: "Mother",
            phone: "+64 21 765 4321"
          }
        },
        rugbyProfile: {
          jerseyNumber: 7,
          primaryPosition: "Flanker",
          secondaryPositions: ["Number 8", "Lock"],
          playingLevel: "Professional",
          yearsInTeam: 3,
          previousClubs: ["Auckland Grammar", "Auckland U19"]
        },
        physicalAttributes: [
          {
            date: "2024-01-15",
            weight: 103,
            bodyFat: 9.0,
            leanMass: 93.7,
            height: 188
          },
          {
            date: "2024-02-15",
            weight: 104,
            bodyFat: 8.5,
            leanMass: 95.2,
            height: 188
          },
          {
            date: "2024-03-15",
            weight: 105,
            bodyFat: 8.2,
            leanMass: 96.4,
            height: 188
          }
        ],
        testResults: [
          {
            date: "2024-03-10",
            testType: "bench_press",
            value: 130,
            unit: "kg"
          },
          {
            date: "2024-03-10",
            testType: "squat",
            value: 185,
            unit: "kg"
          },
          {
            date: "2024-03-10",
            testType: "sprint_40m",
            value: 5.1,
            unit: "s"
          },
          {
            date: "2024-03-10",
            testType: "yo_yo",
            value: 18.2,
            unit: "level"
          },
          {
            date: "2024-03-10",
            testType: "vo2_max",
            value: 58.2,
            unit: "ml/kg/min"
          }
        ],
        skills: {
          ballHandling: 8,
          passing: 7,
          kicking: 6,
          lineoutThrowing: 5,
          scrummaging: 7,
          rucking: 9,
          defense: 8,
          communication: 7
        },
        gameStats: [
          {
            season: "2023",
            matchesPlayed: 12,
            minutesPlayed: 1058,
            tries: 4,
            tackles: 128,
            lineoutWins: 32,
            turnovers: 18,
            penalties: 8
          },
          {
            season: "2024",
            matchesPlayed: 14,
            minutesPlayed: 1247,
            tries: 6,
            tackles: 142,
            lineoutWins: 38,
            turnovers: 23,
            penalties: 6
          }
        ],
        injuries: [],
        reports: [
          {
            id: "r1",
            type: "coach",
            title: "Performance Review - March 2024",
            content: "Excellent progress in lineout work...",
            author: "Coach Thompson",
            date: "2024-03-15",
            lastUpdated: "2024-03-15"
          },
          {
            id: "r2",
            type: "medical",
            title: "Medical Clearance",
            content: "Cleared for full contact...",
            author: "Dr. Smith",
            date: "2024-03-08",
            lastUpdated: "2024-03-08"
          }
        ],
        activities: [
          {
            id: "a1",
            date: "2024-03-20",
            type: "test",
            description: "Physical Test Completed",
            details: "Strength & conditioning assessment"
          },
          {
            id: "a2",
            date: "2024-03-18",
            type: "match",
            description: "Match Performance",
            details: "75 minutes vs Auckland"
          },
          {
            id: "a3",
            date: "2024-03-15",
            type: "meeting",
            description: "Coach Review",
            details: "Performance feedback session"
          }
        ],
        status: {
          fitness: "available",
          medical: "cleared"
        },
        videoAnalysis: [
          {
            id: "video-1",
            title: "Match Highlights vs Auckland Blues",
            description: "Outstanding performance showcasing exceptional lineout throwing and attacking play",
            videoUrl: "https://example.com/video1.mp4",
            thumbnailUrl: "https://example.com/thumb1.jpg",
            duration: 185,
            matchDate: "2024-01-18",
            opponent: "Auckland Blues",
            analysisType: "highlight",
            tags: ["lineout", "attack", "leadership", "tries"],
            keyMoments: [
              {
                timestamp: 45,
                title: "Perfect Lineout Throw",
                description: "Pinpoint accuracy under pressure leading to attacking platform",
                category: "lineout"
              },
              {
                timestamp: 92,
                title: "Try Assist",
                description: "Quick hands to create space for winger's try",
                category: "try"
              }
            ],
            metrics: {
              tackles: 12,
              carries: 8,
              metersGained: 45,
              turnovers: 2,
              passesCompleted: 23,
              lineoutSuccess: 95
            },
            coachNotes: "Excellent game management and leadership qualities on display.",
            isHighlight: true,
            uploadedBy: "Coach Williams",
            uploadedAt: "2024-01-19T10:30:00Z"
          },
          {
            id: "video-2",
            title: "Lineout Training Session",
            description: "Technical breakdown of lineout throwing technique",
            videoUrl: "https://example.com/video2.mp4",
            duration: 420,
            matchDate: "2024-01-15",
            analysisType: "skill_focus",
            tags: ["lineout", "technique", "accuracy"],
            keyMoments: [
              {
                timestamp: 120,
                title: "Throwing Technique",
                description: "Demonstration of proper body positioning",
                category: "skill"
              }
            ],
            metrics: {
              lineoutSuccess: 98
            },
            isHighlight: false,
            uploadedBy: "Coach Thompson",
            uploadedAt: "2024-01-16T14:15:00Z"
          }
        ],
        aiRating: {
          overall: 87,
          physicality: 92,
          skillset: 85,
          gameImpact: 89,
          potential: 84,
          lastUpdated: "2024-03-20"
        }
      };

      await storage.createPlayer(samplePlayer);
      res.json({ message: "Database seeded successfully with sample player data" });
    } catch (error) {
      console.error("Error seeding database:", error);
      res.status(500).json({ error: "Failed to seed database" });
    }
  });
}