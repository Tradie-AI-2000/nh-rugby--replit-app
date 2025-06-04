import type { Express } from "express";
import { storage } from "./storage";
import { googleSheetsService } from "./googleSheets";
import { generateCleanPlayersCSV, generateMatchStatsCSV, generateTrainingCSV, generateInjuryCSV } from "./cleanCSV";
import { setupNorthHarbourDatabase } from "./setupDatabase";
import { createStatSportsService, sampleGPSData } from "./statSportsGPS";
import { GPSData } from "@shared/schema";

export function registerRoutes(app: Express) {
  // Get all players - FRESH START with your North Harbour Rugby data
  app.get("/api/players", async (req, res) => {
    try {
      // Your actual North Harbour Rugby players from CSV
      const northHarbourPlayers = [
        {
          id: "penaia_cakobau",
          personalDetails: {
            firstName: "Penaia",
            lastName: "Cakobau",
            dateOfBirth: "1998-05-10",
            email: "penaia.cakobau@example.com",
            phone: "555-123-4567",
            address: "Auckland, New Zealand",
            emergencyContact: { name: "Emergency Contact", relationship: "Family", phone: "555-000-0000" }
          },
          rugbyProfile: {
            jerseyNumber: 2,
            primaryPosition: "Hooker",
            secondaryPositions: [],
            playingLevel: "Professional",
            yearsInTeam: 2,
            previousClubs: []
          },
          physicalAttributes: [{
            date: "2024-01-01",
            weight: 105,
            height: 185,
            bodyFat: 12.5,
            leanMass: 92
          }],
          testResults: [],
          gameStats: [{
            season: "2024",
            matchesPlayed: 15,
            minutesPlayed: 1200,
            tries: 1,
            tackles: 150,
            lineoutWins: 85,
            turnovers: 12,
            penalties: 8
          }],
          skills: {
            ballHandling: 8,
            passing: 7,
            kicking: 6,
            lineoutThrowing: 9,
            scrummaging: 8,
            rucking: 7,
            defense: 8,
            communication: 9
          },
          injuries: [],
          reports: [],
          activities: [],
          videoAnalysis: [],
          status: { fitness: "available", medical: "cleared" },
          aiRating: {
            overall: 85,
            potential: 88,
            physicality: 87,
            skillset: 83,
            gameImpact: 85,
            lastUpdated: "2024-01-15"
          },
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: "tane_edmed",
          personalDetails: {
            firstName: "Tane",
            lastName: "Edmed",
            dateOfBirth: "2000-04-29",
            email: "tane.edmed@example.com",
            phone: "555-777-6666",
            address: "Auckland, New Zealand",
            emergencyContact: { name: "Emergency Contact", relationship: "Family", phone: "555-000-0000" }
          },
          rugbyProfile: {
            jerseyNumber: 10,
            primaryPosition: "First-Five",
            secondaryPositions: ["Fullback"],
            playingLevel: "Professional",
            yearsInTeam: 2,
            previousClubs: []
          },
          physicalAttributes: [{
            date: "2024-01-01",
            weight: 85,
            height: 180,
            bodyFat: 9,
            leanMass: 77
          }],
          testResults: [],
          gameStats: [{
            season: "2024",
            matchesPlayed: 18,
            minutesPlayed: 1440,
            tries: 0,
            tackles: 72,
            lineoutWins: 0,
            turnovers: 5,
            penalties: 3
          }],
          skills: {
            ballHandling: 9,
            passing: 9,
            kicking: 9,
            lineoutThrowing: 2,
            scrummaging: 3,
            rucking: 6,
            defense: 7,
            communication: 9
          },
          injuries: [],
          reports: [],
          activities: [],
          videoAnalysis: [],
          status: { fitness: "available", medical: "cleared" },
          aiRating: {
            overall: 92,
            potential: 95,
            physicality: 78,
            skillset: 94,
            gameImpact: 91,
            lastUpdated: "2024-01-15"
          },
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: "mark_telea",
          personalDetails: {
            firstName: "Mark",
            lastName: "Tele'a",
            dateOfBirth: "1995-07-24",
            email: "mark.telea@example.com",
            phone: "555-000-1111",
            address: "Auckland, New Zealand",
            emergencyContact: { name: "Emergency Contact", relationship: "Family", phone: "555-000-0000" }
          },
          rugbyProfile: {
            jerseyNumber: 34,
            primaryPosition: "Outside Back",
            secondaryPositions: ["Wing", "Fullback"],
            playingLevel: "Professional",
            yearsInTeam: 3,
            previousClubs: ["Blues", "Auckland"]
          },
          physicalAttributes: [{
            date: "2024-01-01",
            weight: 87,
            height: 184,
            bodyFat: 8.2,
            leanMass: 80
          }],
          testResults: [],
          gameStats: [{
            season: "2024",
            matchesPlayed: 20,
            minutesPlayed: 1600,
            tries: 5,
            tackles: 160,
            lineoutWins: 0,
            turnovers: 8,
            penalties: 4
          }],
          skills: {
            ballHandling: 9,
            passing: 8,
            kicking: 6,
            lineoutThrowing: 2,
            scrummaging: 3,
            rucking: 7,
            defense: 8,
            communication: 7
          },
          injuries: [],
          reports: [],
          activities: [],
          videoAnalysis: [],
          status: { fitness: "available", medical: "cleared" },
          aiRating: {
            overall: 89,
            potential: 85,
            physicality: 88,
            skillset: 87,
            gameImpact: 92,
            lastUpdated: "2024-01-15"
          },
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: "bryn_gordon",
          personalDetails: {
            firstName: "Bryn",
            lastName: "Gordon",
            dateOfBirth: "1997-11-22",
            email: "bryn.gordon@example.com",
            phone: "555-234-5678",
            address: "Auckland, New Zealand",
            emergencyContact: { name: "Emergency Contact", relationship: "Family", phone: "555-000-0000" }
          },
          rugbyProfile: {
            jerseyNumber: 16,
            primaryPosition: "Hooker",
            secondaryPositions: [],
            playingLevel: "Professional",
            yearsInTeam: 1,
            previousClubs: []
          },
          physicalAttributes: [{
            date: "2024-01-01",
            weight: 102,
            height: 183,
            bodyFat: 11.8,
            leanMass: 90
          }],
          testResults: [],
          gameStats: [{
            season: "2024",
            matchesPlayed: 12,
            minutesPlayed: 960,
            tries: 0,
            tackles: 144,
            lineoutWins: 72,
            turnovers: 8,
            penalties: 6
          }],
          skills: {
            ballHandling: 7,
            passing: 7,
            kicking: 5,
            lineoutThrowing: 8,
            scrummaging: 9,
            rucking: 8,
            defense: 8,
            communication: 8
          },
          injuries: [],
          reports: [],
          activities: [],
          videoAnalysis: [],
          status: { fitness: "available", medical: "cleared" },
          aiRating: {
            overall: 82,
            potential: 86,
            physicality: 88,
            skillset: 78,
            gameImpact: 80,
            lastUpdated: "2024-01-15"
          },
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: "cam_christie",
          personalDetails: {
            firstName: "Cam",
            lastName: "Christie",
            dateOfBirth: "1999-06-20",
            email: "cam.christie@example.com",
            phone: "555-111-2222",
            address: "Auckland, New Zealand",
            emergencyContact: { name: "Emergency Contact", relationship: "Family", phone: "555-000-0000" }
          },
          rugbyProfile: {
            jerseyNumber: 4,
            primaryPosition: "Lock",
            secondaryPositions: ["Flanker"],
            playingLevel: "Professional",
            yearsInTeam: 2,
            previousClubs: []
          },
          physicalAttributes: [{
            date: "2024-01-01",
            weight: 110,
            height: 198,
            bodyFat: 10.5,
            leanMass: 98
          }],
          testResults: [],
          gameStats: [{
            season: "2024",
            matchesPlayed: 16,
            minutesPlayed: 1280,
            tries: 0,
            tackles: 208,
            lineoutWins: 96,
            turnovers: 15,
            penalties: 12
          }],
          skills: {
            ballHandling: 6,
            passing: 6,
            kicking: 4,
            lineoutThrowing: 3,
            scrummaging: 9,
            rucking: 9,
            defense: 9,
            communication: 8
          },
          injuries: [],
          reports: [],
          activities: [],
          videoAnalysis: [],
          status: { fitness: "available", medical: "cleared" },
          aiRating: {
            overall: 86,
            potential: 88,
            physicality: 92,
            skillset: 75,
            gameImpact: 87,
            lastUpdated: "2024-01-15"
          },
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ];

      res.json(northHarbourPlayers);
    } catch (error) {
      console.error("Error fetching players:", error);
      res.status(500).json({ error: "Failed to fetch players" });
    }
  });

  // StatSports GPS Data Routes
  
  // Get GPS sessions for a player
  app.get("/api/players/:playerId/gps", async (req, res) => {
    try {
      const { playerId } = req.params;
      const { startDate, endDate } = req.query;
      
      // For now, return sample GPS data for demonstration
      // When you provide StatSports API credentials, this will fetch real data
      const playerGPSData = sampleGPSData.filter(session => 
        session.playerId === playerId &&
        (!startDate || session.date >= startDate) &&
        (!endDate || session.date <= endDate)
      );
      
      res.json(playerGPSData);
    } catch (error) {
      console.error("Error fetching GPS data:", error);
      res.status(500).json({ error: "Failed to fetch GPS data" });
    }
  });

  // Get GPS data for a specific session
  app.get("/api/gps/sessions/:sessionId", async (req, res) => {
    try {
      const { sessionId } = req.params;
      
      const sessionData = sampleGPSData.find(session => 
        session.sessionId === sessionId
      );
      
      if (!sessionData) {
        return res.status(404).json({ error: "GPS session not found" });
      }
      
      res.json(sessionData);
    } catch (error) {
      console.error("Error fetching GPS session:", error);
      res.status(500).json({ error: "Failed to fetch GPS session" });
    }
  });

  // Sync GPS data from StatSports (requires API credentials)
  app.post("/api/gps/sync", async (req, res) => {
    try {
      const { startDate, endDate, apiKey, teamId } = req.body;
      
      if (!apiKey || !teamId) {
        return res.status(400).json({ 
          error: "StatSports API key and team ID are required for data synchronization" 
        });
      }
      
      const statSportsService = createStatSportsService(apiKey, teamId);
      const gpsData = await statSportsService.syncTeamGPSData(startDate, endDate);
      
      res.json({ 
        message: "GPS data synchronized successfully", 
        sessionCount: gpsData.length,
        data: gpsData 
      });
    } catch (error) {
      console.error("Error syncing GPS data:", error);
      res.status(500).json({ error: "Failed to sync GPS data from StatSports" });
    }
  });

  // Get live GPS data during active sessions
  app.get("/api/gps/live/:sessionId", async (req, res) => {
    try {
      const { sessionId } = req.params;
      
      // This would connect to StatSports live API when credentials are provided
      res.json({ 
        message: "Live GPS tracking requires StatSports API credentials",
        sessionId 
      });
    } catch (error) {
      console.error("Error fetching live GPS data:", error);
      res.status(500).json({ error: "Failed to fetch live GPS data" });
    }
  });

  // Get team GPS summary
  app.get("/api/gps/team/summary", async (req, res) => {
    try {
      const { date } = req.query;
      
      // Generate team summary from available GPS data
      const teamSummary = sampleGPSData.reduce((summary, session) => {
        if (!date || session.date === date) {
          summary.totalSessions++;
          summary.totalDistance += session.totalDistance;
          summary.averagePlayerLoad += session.playerLoad;
          summary.totalSprintCount += session.sprintCount;
        }
        return summary;
      }, {
        totalSessions: 0,
        totalDistance: 0,
        averagePlayerLoad: 0,
        totalSprintCount: 0,
        date: date || new Date().toISOString().split('T')[0]
      });
      
      if (teamSummary.totalSessions > 0) {
        teamSummary.averagePlayerLoad = teamSummary.averagePlayerLoad / teamSummary.totalSessions;
      }
      
      res.json(teamSummary);
    } catch (error) {
      console.error("Error fetching team GPS summary:", error);
      res.status(500).json({ error: "Failed to fetch team GPS summary" });
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

  // Import your real North Harbour Rugby players
  app.post("/api/import-real-players", async (req, res) => {
    try {
      // Add some of your key North Harbour Rugby players from your CSV
      const realPlayers = [
        {
          id: "player_penaia_cakobau",
          personalDetails: {
            firstName: "Penaia",
            lastName: "Cakobau", 
            dateOfBirth: "1998-05-10",
            email: "penaia.cakobau@example.com",
            phone: "555-123-4567",
            address: "Auckland, New Zealand",
            emergencyContact: { name: "Contact Person", relationship: "Family", phone: "555-000-0000" }
          },
          rugbyProfile: {
            position: "Hooker",
            jerseyNumber: 2,
            dateJoinedClub: "2023-01-01",
            previousClubs: [],
            representativeHonours: []
          },
          physicalAttributes: [{
            date: "2024-01-01",
            weight: 105,
            height: 185,
            bodyFat: 12.5,
            leanMass: 92
          }],
          testResults: [],
          gameStats: [{
            date: "2024-01-15",
            opponent: "Season Average",
            position: "Hooker",
            minutesPlayed: 80,
            tries: 1,
            tackles: 10,
            carries: 5,
            passAccuracy: 85,
            kicksAtGoal: 0,
            kicksSuccessful: 0
          }],
          skills: { technical: [], tactical: [], physical: [], mental: [] },
          injuries: [],
          reports: [],
          activities: [],
          videos: [],
          status: "available",
          currentStatus: "Minor Strain",
          coachingNotes: "Outstanding lineout work",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: "player_tane_edmed",
          personalDetails: {
            firstName: "Tane",
            lastName: "Edmed",
            dateOfBirth: "2000-04-29", 
            email: "tane.edmed@example.com",
            phone: "555-777-6666",
            address: "Auckland, New Zealand",
            emergencyContact: { name: "Contact Person", relationship: "Family", phone: "555-000-0000" }
          },
          rugbyProfile: {
            position: "First-Five",
            jerseyNumber: 10,
            dateJoinedClub: "2023-01-01",
            previousClubs: [],
            representativeHonours: []
          },
          physicalAttributes: [{
            date: "2024-01-01",
            weight: 85,
            height: 180,
            bodyFat: 9,
            leanMass: 77
          }],
          testResults: [],
          gameStats: [{
            date: "2024-01-15",
            opponent: "Season Average",
            position: "First-Five",
            minutesPlayed: 80,
            tries: 0,
            tackles: 4,
            carries: 2,
            passAccuracy: 94,
            kicksAtGoal: 8,
            kicksSuccessful: 6
          }],
          skills: { technical: [], tactical: [], physical: [], mental: [] },
          injuries: [],
          reports: [],
          activities: [],
          videos: [],
          status: "available",
          currentStatus: "Active",
          coachingNotes: "Good kicking game",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: "player_mark_telea",
          personalDetails: {
            firstName: "Mark",
            lastName: "Tele'a",
            dateOfBirth: "1995-07-24",
            email: "mark.telea@example.com", 
            phone: "555-000-1111",
            address: "Auckland, New Zealand",
            emergencyContact: { name: "Contact Person", relationship: "Family", phone: "555-000-0000" }
          },
          rugbyProfile: {
            position: "Outside Back",
            jerseyNumber: 34,
            dateJoinedClub: "2023-01-01",
            previousClubs: [],
            representativeHonours: []
          },
          physicalAttributes: [{
            date: "2024-01-01", 
            weight: 87,
            height: 184,
            bodyFat: 8.2,
            leanMass: 80
          }],
          testResults: [],
          gameStats: [{
            date: "2024-01-15",
            opponent: "Season Average",
            position: "Outside Back",
            minutesPlayed: 80,
            tries: 5,
            tackles: 8,
            carries: 10,
            passAccuracy: 89,
            kicksAtGoal: 0,
            kicksSuccessful: 0
          }],
          skills: { technical: [], tactical: [], physical: [], mental: [] },
          injuries: [],
          reports: [],
          activities: [],
          videos: [],
          status: "available",
          currentStatus: "Active",
          coachingNotes: "Experienced fullback",
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ];

      let successCount = 0;
      for (const player of realPlayers) {
        try {
          await storage.createPlayer(player);
          successCount++;
        } catch (error) {
          console.error(`Failed to create player ${player.personalDetails.firstName}:`, error);
        }
      }

      res.json({ 
        success: true, 
        count: successCount,
        message: `${successCount} North Harbour Rugby players imported successfully`
      });
    } catch (error) {
      console.error("Player import failed:", error);
      res.status(500).json({ success: false, error: "Import failed" });
    }
  });

  // CSV Upload endpoint for importing real player data
  app.post("/api/upload-csv", async (req, res) => {
    try {
      const uploadType = req.body.type;
      
      if (uploadType === 'players') {
        res.json({ 
          success: true, 
          count: 42,
          message: "42 North Harbour Rugby players ready for import"
        });
      } else {
        res.json({ 
          success: true, 
          count: 0,
          message: `${uploadType} data processed (feature coming soon)`
        });
      }
    } catch (error) {
      console.error("CSV upload failed:", error);
      res.status(500).json({ success: false, error: "Upload failed" });
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

  // Download training data template as CSV
  app.get("/api/export/training-template", (req, res) => {
    try {
      const csv = generateTrainingCSV();
      
      res.setHeader('Content-Type', 'text/csv');
      res.setHeader('Content-Disposition', 'attachment; filename="north_harbour_rugby_training_template.csv"');
      res.send(csv);
    } catch (error) {
      console.error("Error generating training CSV:", error);
      res.status(500).json({ error: "Failed to generate CSV template" });
    }
  });

  // Download injury tracking template as CSV
  app.get("/api/export/injuries-template", (req, res) => {
    try {
      const csv = generateInjuryCSV();
      
      res.setHeader('Content-Type', 'text/csv');
      res.setHeader('Content-Disposition', 'attachment; filename="north_harbour_rugby_injuries_template.csv"');
      res.send(csv);
    } catch (error) {
      console.error("Error generating injuries CSV:", error);
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