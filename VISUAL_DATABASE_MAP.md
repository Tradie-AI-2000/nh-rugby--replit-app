# 🗺️ Visual Database Navigation Map

## 📍 How to Navigate Database Connections

This shows you **exactly** where to find and edit each piece of data for every page in your app.

---

## 🏠 **HOME DASHBOARD** 
**What you see:** Team overview, player counts, quick stats

### Frontend File:
```
client/src/pages/Home.tsx
```

### API Call:
```javascript
useQuery({ queryKey: ['/api/players'] })
```

### Backend Route:
```
server/routes_clean.ts → line 7
app.get("/api/players", ...)
```

### Data Source:
```
server/northHarbourPlayers.ts → Full 42-player roster
```

### To Edit Home Data:
1. Go to `server/northHarbourPlayers.ts` 
2. Find the player you want to change
3. Edit their data directly
4. Save file - changes appear immediately

---

## 👥 **SQUAD BUILDER** 
**What you see:** Create squads, select players, manage teams

### Frontend File:
```
client/src/pages/squad-builder.tsx
```

### API Calls:
```javascript
// Get all squads
useQuery({ queryKey: ['/api/squads'] })

// Get all players for selection
useQuery({ queryKey: ['/api/players'] })

// Get specific squad details  
useQuery({ queryKey: ['/api/squads', squadId] })
```

### Backend Routes:
```
server/routes_clean.ts:

line 23: app.get('/api/squads')       → Get all squads
line 34: app.post('/api/squads')      → Create new squad  
line 50: app.get('/api/squads/:id')   → Get squad details
line 67: app.post('/api/squads/:id/players') → Add player to squad
```

### Database Tables:
```sql
-- Squad information
squads (id, name, matchName, matchDate, notes)

-- Player selections in squads  
squadSelections (id, squadId, playerId, position)

-- AI-generated advice
squadAdvice (id, squadId, adviceType, message, priority)
```

### To Edit Squad Data:
1. **Change squad info:** Edit in database or via app interface
2. **Change player availability:** Go to `server/northHarbourPlayers.ts` → find player → change `currentStatus`
3. **Change squad selections:** Use the app interface or directly edit `squadSelections` table

---

## 👤 **PLAYER PROFILE** 
**What you see:** Individual player details, stats, performance

### Frontend File:
```
client/src/pages/PlayerProfile.tsx
```

### API Call:
```javascript
useQuery({ queryKey: ['/api/players', playerId] })
```

### Backend Route:
```
server/routes_clean.ts → line 16
app.get("/api/players/:id", ...)
```

### Data Source & Structure:
```
server/northHarbourPlayers.ts → Find player by ID

Player Data Structure:
{
  id: "player_id",
  personalDetails: {
    firstName: "John",
    lastName: "Smith", 
    dateOfBirth: "1995-06-15",
    position: "Flanker",
    jerseyNumber: 7
  },
  currentStatus: "Fit" | "Injured" | "Suspended",
  gameStats: [{
    season: "2024",
    tries: 5,
    tackles: 87,
    penalties: 3,
    matchesPlayed: 15
  }],
  skills: {
    ballHandling: 8,
    passing: 7,
    defense: 9,
    communication: 8
  }
}
```

### To Edit Player Data:
1. Go to `server/northHarbourPlayers.ts`
2. Find player by ID (e.g., "james_parsons")
3. Edit any field you want:
   - Personal details
   - Game statistics
   - Skills ratings
   - Current status
4. Save file - changes appear immediately in player profile

---

## 🏥 **MEDICAL HUB**
**What you see:** Injured players, medical status, health tracking

### Frontend File:
```
client/src/pages/medical-hub.tsx
```

### API Call:
```javascript
useQuery({ queryKey: ['/api/players'] })
// Then filters for injured/at-risk players
```

### Backend Route:
```
Same as players: server/routes_clean.ts → line 7
app.get("/api/players", ...)
```

### Data Filtering Logic:
```javascript
// In medical-hub.tsx around line 25:
const injuredPlayers = (players || []).filter(player => 
  player.currentStatus === 'Injured'
);

const atRiskPlayers = (players || []).filter(player =>
  player.currentStatus === 'Monitoring' || 
  player.gameStats?.some(stat => stat.penalties > 8)
);
```

### To Edit Medical Data:
1. Go to `server/northHarbourPlayers.ts`
2. Find player you want to mark as injured
3. Change `currentStatus: "Injured"`
4. Save file - player appears in Medical Hub

**Add injury details:**
```javascript
// In player object, add:
injuries: [{
  id: "inj_001",
  type: "hamstring",
  severity: "minor", 
  date: "2024-01-15",
  status: "active"
}]
```

---

## 📊 **TRY ANALYSIS / WORK RATE REPORT**
**What you see:** Match analysis, try patterns, performance insights

### Frontend File:
```
client/src/pages/try-analysis-simplified.tsx
```

### API Calls:
```javascript
// Save match analysis
apiRequest('/api/match-analysis', 'POST', analysisData)

// Get Gemini AI insights  
apiRequest('/api/gemini/analyze-section', 'POST', {...})
```

### Backend Routes:
```
server/routes_clean.ts:

line 156: app.post('/api/match-analysis')     → Save try analysis
line 200: app.post('/api/gemini/analyze-section') → Get AI insights
```

### Database Table:
```sql
matchTryData (
  id, matchId, teamName, opponentName,
  tryAnalysis JSONB,    -- Try breakdown data
  playerPerformance JSONB,  -- Player stats
  aiInsights JSONB      -- AI-generated insights
)
```

### To Edit Try Analysis Data:
1. **Add new match:** Use the Try Analysis page interface
2. **Edit existing analysis:** Query database directly:
   ```sql
   UPDATE matchTryData 
   SET tryAnalysis = '{"new": "data"}'
   WHERE matchId = 'your_match_id';
   ```
3. **Change AI insights:** Edit in `server/geminiAnalysis.ts`

---

## 📈 **REPORTS**
**What you see:** Downloadable CSV exports, data summaries

### Frontend File:
```
client/src/pages/Reports.tsx
```

### API Calls:
```javascript
// Export player data
fetch('/api/export/players-csv')

// Export match stats  
fetch('/api/export/match-stats-csv')

// Export training data
fetch('/api/export/training-csv')
```

### Backend Routes:
```
server/routes_clean.ts:

line 220: app.get('/api/export/players-csv')
line 230: app.get('/api/export/match-stats-csv') 
line 240: app.get('/api/export/training-csv')
```

### Data Source:
```
server/cleanCSV.ts → Generates clean CSV exports
server/northHarbourPlayers.ts → Source player data
```

### To Edit Report Data:
1. **Change export format:** Edit `server/cleanCSV.ts`
2. **Change source data:** Edit `server/northHarbourPlayers.ts`
3. **Add new export type:** Add route in `server/routes_clean.ts`

---

## 🎯 **Quick Edit Guide**

### Want to change a player's status?
```
📁 server/northHarbourPlayers.ts 
→ Find player by name
→ Change currentStatus: "Fit" | "Injured" | "Suspended"
```

### Want to add a new player?
```
📁 server/northHarbourPlayers.ts
→ Add new player object to the array
→ Follow existing format
```

### Want to modify squad functionality?
```
📁 server/routes_clean.ts → Squad routes (lines 23-120)
📁 client/src/pages/squad-builder.tsx → Frontend interface  
```

### Want to change medical tracking?
```
📁 client/src/pages/medical-hub.tsx → Change filtering logic
📁 server/northHarbourPlayers.ts → Add injury data to players
```

### Want to modify try analysis?
```
📁 client/src/pages/try-analysis-simplified.tsx → Frontend interface
📁 server/routes_clean.ts → API endpoints (lines 156-200)
📁 server/geminiAnalysis.ts → AI analysis logic
```

---

## 🔍 **Finding Specific Data**

### Player Performance Stats:
```
server/northHarbourPlayers.ts → gameStats array
```

### Squad Information:
```
Database: squads table
API: /api/squads
```

### Match Analysis:
```
Database: matchTryData table  
API: /api/match-analysis
```

### Medical Records:
```
server/northHarbourPlayers.ts → injuries array
server/northHarbourPlayers.ts → currentStatus field
```

This map shows you exactly where every piece of data lives and how to modify it!