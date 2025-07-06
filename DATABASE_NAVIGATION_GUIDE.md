# North Harbour Rugby - Database Navigation Guide

## Overview
This guide shows exactly which database tables and backend files connect to each page in the app, so you can easily find and edit the data sources.

## Page-to-Database Mapping

### 🏠 **Home Dashboard** (`/`)
**Frontend:** `client/src/pages/Home.tsx`
**Database Tables:**
- `players` - Main player roster data
- Uses player summary stats and basic info

**Backend Files:**
- `server/routes.ts` - API endpoints `/api/players`
- `shared/schema.ts` - Player table definition (lines 200-280)

**Key Data Fields:**
```sql
SELECT firstName, lastName, primaryPosition, jerseyNumber, 
       currentStatus, overallRating, lastMatchDate 
FROM players
```

---

### 👥 **Squad Builder** (`/squad-builder`)
**Frontend:** `client/src/pages/SquadBuilder.tsx`
**Database Tables:**
- `players` - All player data
- Uses position groupings (Forwards, Backs)

**Backend Files:**
- `server/routes.ts` - `/api/players` endpoint
- `server/northHarbourPlayers.ts` - Initial squad data (42 players)
- `shared/schema.ts` - Complete player schema

**Key Data Fields:**
```sql
SELECT * FROM players 
WHERE primaryPosition IN ('Prop', 'Hooker', 'Lock', 'Flanker', 'Number 8') -- Forwards
   OR primaryPosition IN ('Scrum-half', 'Fly-half', 'Centre', 'Wing', 'Fullback') -- Backs
```

---

### 📊 **Player Profile** (`/player/:id`)
**Frontend:** `client/src/pages/PlayerProfile.tsx`
**Database Tables:**
- `players` - Main player record
- Nested JSON fields for complex data

**Backend Files:**
- `server/routes.ts` - `/api/players/:id` endpoint
- `server/dataIntegrityManager.ts` - Handles data relationships
- `server/dataUpdateService.ts` - Manages updates

**Key Data Sections:**
```sql
-- Personal Details
firstName, lastName, dateOfBirth, height, weight

-- Rugby Profile  
primaryPosition, jerseyNumber, experience, playingLevel

-- Physical Attributes (JSON array)
physicalAttributes: [
  { date: "2024-01-15", weight: 95, bodyFat: 12, leanMass: 84 }
]

-- Test Results (JSON array)
testResults: [
  { date: "2024-01-15", testType: "bench_press", value: 120, unit: "kg" }
]

-- Game Statistics (JSON array)
gameStats: [
  { season: "2024", tries: 8, tackles: 156, passAccuracy: 85 }
]

-- Skills Assessment (JSON object)
skills: {
  ballHandling: 8, passing: 7, kicking: 6, defense: 9
}

-- Injuries (JSON array)
injuries: [
  { id: "inj_001", type: "hamstring", severity: "minor", status: "resolved" }
]
```

---

### 🏥 **Medical Hub** (`/medical-hub`)
**Frontend:** `client/src/pages/medical-hub.tsx`
**Database Tables:**
- `players` - Medical status and injury data
- Filters for injured/at-risk players

**Backend Files:**
- `server/routes.ts` - `/api/players` with medical filtering
- `server/dataUpdateService.ts` - Medical appointment handling

**Key Data Fields:**
```sql
SELECT firstName, lastName, primaryPosition,
       injuries, medicalHistory, currentStatus,
       status->'medical' as medicalStatus,
       status->'availability' as availability
FROM players 
WHERE status->>'medical' IN ('restricted', 'monitoring')
   OR status->>'availability' = 'injured'
```

---

### 📈 **Try Analysis / Work Rate Report** (`/try-analysis`)
**Frontend:** `client/src/pages/try-analysis-simplified.tsx`
**Database Tables:**
- `matchAnalysis` - Try scoring data and patterns
- `players` - Player involvement in tries

**Backend Files:**
- `server/routes.ts` - `/api/match-analysis` endpoint
- `server/geminiAnalysis.ts` - AI analysis of try patterns

**Key Data Structure:**
```sql
-- Match Analysis Table
CREATE TABLE matchAnalysis (
  id SERIAL PRIMARY KEY,
  matchId TEXT,
  teamName TEXT,
  opponentName TEXT,
  
  -- Try Analysis Data (JSON)
  tryAnalysis JSONB,
  
  -- Player Performance (JSON)
  playerPerformance JSONB,
  
  -- AI Insights (JSON)
  aiInsights JSONB
);
```

---

### 📋 **Reports** (`/reports`)
**Frontend:** `client/src/pages/Reports.tsx`
**Database Tables:**
- `players` - Source data for all reports
- Aggregates data for CSV exports

**Backend Files:**
- `server/csvExport.ts` - Generates downloadable reports
- `server/cleanCSV.ts` - Clean data formatting

**Report Types:**
```sql
-- Player Performance Report
SELECT firstName, lastName, position, overallRating,
       gameStats, physicalAttributes, skills
FROM players

-- Medical Report  
SELECT firstName, lastName, injuries, medicalHistory,
       status->'medical', lastMedicalCheck
FROM players

-- Training Load Report
SELECT firstName, lastName, trainingLoad, gpsData,
       physicalAttributes->-1 as latestPhysical
FROM players
```

---

## 🔧 **Backend File Structure**

### **Database Connection & Schema**
- `server/db.ts` - Database connection setup
- `shared/schema.ts` - All table definitions and data types
- `drizzle.config.ts` - Database configuration

### **Data Management**
- `server/dataIntegrityManager.ts` - Handles data relationships and validation
- `server/dataUpdateService.ts` - Manages all data updates
- `server/storage.ts` - Database operations interface

### **API Routes**
- `server/routes.ts` - All API endpoints that frontend calls
- `server/index.ts` - Server startup and middleware

### **Data Processing**
- `server/northHarbourPlayers.ts` - Initial 42-player squad data
- `server/csvExport.ts` - Export functionality
- `server/geminiAnalysis.ts` - AI analysis processing

---

## 🎯 **Quick Reference: Where to Edit What**

### **To Add a New Player Field:**
1. `shared/schema.ts` - Add field to player table schema
2. `server/routes.ts` - Update API endpoints if needed
3. Frontend component - Add to forms/displays

### **To Modify Player Data:**
1. `server/northHarbourPlayers.ts` - Edit initial squad data
2. `server/dataUpdateService.ts` - Add validation rules
3. `server/dataIntegrityManager.ts` - Add cascading update rules

### **To Change Medical Data:**
1. `shared/schema.ts` - Modify injury/medical schemas
2. `client/src/pages/medical-hub.tsx` - Update display logic
3. `server/dataUpdateService.ts` - Update medical processing

### **To Add New Reports:**
1. `server/csvExport.ts` - Add new export function
2. `client/src/pages/Reports.tsx` - Add download button
3. `server/routes.ts` - Add API endpoint if needed

---

## 📊 **Database Schema Quick View**

```sql
-- Main Players Table
players (
  id SERIAL PRIMARY KEY,
  firstName TEXT,
  lastName TEXT,
  primaryPosition TEXT,
  jerseyNumber INTEGER,
  
  -- Complex data stored as JSON
  physicalAttributes JSONB,  -- Time-series physical data
  testResults JSONB,         -- Fitness test history
  gameStats JSONB,          -- Match performance data
  skills JSONB,             -- Skill ratings (1-10)
  injuries JSONB,           -- Injury history
  gpsData JSONB,           -- GPS tracking data
  status JSONB             -- Current status info
);
```

This structure allows flexible data while maintaining relationships and performance for rugby analytics.