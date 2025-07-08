# 🏉 North Harbour Rugby - Complete Data Schema Mapping & Relationships

## Overview
This document provides a comprehensive mapping of all data structures in the North Harbour Rugby Performance Hub, showing how they interconnect, relate to each other, and cascade changes throughout the system. Understanding these relationships is crucial for maintaining data integrity and leveraging the full analytical power of the platform.

## 🗃️ DATABASE SCHEMA OVERVIEW

### **Primary Tables and Their Relationships**

#### **1. PLAYERS (Central Entity)**
```sql
Table: players
Primary Key: id (text)
```
**Core Structure:**
- **personalDetails** (jsonb) - Identity and contact information
- **rugbyProfile** (jsonb) - Position, jersey number, experience
- **physicalAttributes** (jsonb array) - Time-series physical data
- **testResults** (jsonb array) - Performance test history
- **skills** (jsonb) - 1-10 skill ratings
- **gameStats** (jsonb array) - Match performance data
- **contributionsData** (jsonb) - MoneyBall analytics
- **cohesionMetrics** (jsonb) - Team impact scores
- **contractInfo** (jsonb) - Financial and contract data
- **characterProfile** (jsonb) - Intangibles and personality
- **physicalPerformance** (jsonb) - Physical test results
- **injuries** (jsonb array) - Injury history
- **reports** (jsonb array) - Coaching and medical reports
- **activities** (jsonb array) - Activity logs
- **videoAnalysis** (jsonb array) - Video analysis data
- **status** (jsonb) - Current fitness and medical status
- **aiRating** (jsonb) - AI-generated performance ratings

#### **2. MATCH_PERFORMANCES (Performance Tracking)**
```sql
Table: match_performances
Primary Key: id (text)
Foreign Key: playerId → players.id
```
**Performance Metrics:**
- **Attack**: carries, metresCarried, linebreaks, gainlineMadePercent
- **Defense**: tacklesMade, tacklesMissed, madeTacklePercent
- **Breakdown**: rucks, quickBallPercent, breakdownSteals
- **Set Piece**: scrumWonPercent, lineoutWonPercent, lineoutSteals
- **Possession**: possessionPercent, territoryPercent
- **Individual**: ruckArrivals, cleanouts, dominantTackles

#### **3. MATCH_SUMMARIES (Team Performance)**
```sql
Table: match_summaries
Primary Key: id (text)
```
**Team-Level Metrics:**
- **Game Details**: date, opponent, venue, result, finalScore
- **Team Totals**: teamPossessionPercent, teamTerritoryPercent
- **Performance**: teamCarryEfficiencyPercent, teamRuckRetentionPercent

#### **4. MATCH_TRY_DATA (Tactical Analysis)**
```sql
Table: match_try_data
Primary Key: id (serial)
```
**Try Analysis:**
- **Spatial Data**: x, y coordinates, zone classification
- **Temporal Data**: quarter, phase of play
- **Tactical Data**: type, team, analysis perspective
- **Breakdowns**: zoneBreakdown, quarterBreakdown, phaseBreakdown

#### **5. SQUADS & SQUAD_SELECTIONS (Team Selection)**
```sql
Table: squads
Primary Key: id (serial)

Table: squad_selections
Primary Key: id (serial)
Foreign Keys: squadId → squads.id, playerId → players.id
```
**Selection Data:**
- **Squad Info**: name, matchName, matchDate, createdBy
- **Player Selection**: position, isStarter, orderInPosition
- **Selection Logic**: selectionReason, squad advice

#### **6. USERS (Authentication & Access)**
```sql
Table: users
Primary Key: id (serial)
```
**User Management:**
- **Authentication**: username, email, hashedPassword
- **Authorization**: role, permissions, department
- **Profile**: firstName, lastName, isActive, lastLogin

---

## 🔗 DATA RELATIONSHIPS & CASCADING EFFECTS

### **Critical Relationship Map**

#### **1. PLAYER-CENTRIC RELATIONSHIPS**
```
PLAYERS (Central Hub)
├── match_performances (1:many) → Individual match data
├── squad_selections (1:many) → Team selection history
├── GPS Data (via StatSports API) → Real-time performance
└── AI Analysis (via Gemini) → Performance insights
```

#### **2. MATCH-CENTRIC RELATIONSHIPS**
```
MATCH_SUMMARIES (Team Level)
├── match_performances (1:many) → Individual contributions
├── match_try_data (1:many) → Tactical analysis
└── AI Analysis → Match insights and recommendations
```

#### **3. SQUAD-CENTRIC RELATIONSHIPS**
```
SQUADS (Team Selection)
├── squad_selections (1:many) → Player assignments
├── squad_advice (1:many) → Selection recommendations
└── Players (via squad_selections) → Individual profiles
```

---

## 🎯 COHESION METRICS & PLAYER VALUE CALCULATIONS

### **Cohesion Score Calculation**
```sql
cohesionMetrics: {
  cohesionScore: number,        // Aggregate team impact score
  attendanceScore: number,      // Training/match attendance (0-10)
  scScore: number,             // Strength & conditioning commitment (0-10)
  medicalScore: number,        // Robustness/availability (0-10)
  personalityScore: number,    // Leadership/team-fit/communication (0-10)
  availabilityPercentage: number, // % available for selection
  leadershipRating: number,    // Leadership capability (1-10)
  teamFitRating: number,       // Cultural fit (1-10)
  communicationRating: number  // Communication effectiveness (1-10)
}
```

**Calculation Formula:**
```
cohesionScore = (
  (attendanceScore * 0.25) +
  (scScore * 0.15) +
  (medicalScore * 0.20) +
  (personalityScore * 0.25) +
  (leadershipRating * 0.15)
) * (availabilityPercentage / 100)
```

### **Player Value Calculations**
```sql
contributionsData: {
  totalContributions: number,      // Total game contributions
  avgContributions: number,        // Average per game
  positiveContributions: number,   // Positive impact plays
  positivePercent: number,         // % positive contributions
  workEfficiencyIndex: number,     // Efficiency rating
  playerWorkRate: number,          // Work rate score
  xFactorContributions: number,    // Game-changing plays
  xFactorPercent: number          // % x-factor contributions
}
```

**Value Calculation Formula:**
```
playerValue = (
  baseContractValue +
  (avgContributions * contributionMultiplier) +
  (cohesionScore * cohesionMultiplier) +
  (aiRating.overall * aiMultiplier) +
  (availabilityPercentage * availabilityMultiplier)
) * positionMultiplier
```

---

## ⚡ CASCADING EFFECTS: WHAT HAPPENS WHEN DATA CHANGES

### **1. When Physical Attributes Change**
```
physicalAttributes Update → Triggers:
├── AI Rating recalculation
├── Injury risk assessment update
├── Training load adjustment
├── Position suitability review
├── Contract value recalculation
└── GPS performance context update
```

### **2. When Injury Status Changes**
```
injuries Update → Triggers:
├── Medical score adjustment
├── Availability percentage update
├── Cohesion score recalculation
├── Squad selection restrictions
├── Training load modifications
├── Contract value adjustment
└── AI rating context update
```

### **3. When Match Performance Changes**
```
match_performances Update → Triggers:
├── Game stats aggregation
├── Contributions data update
├── Work efficiency index recalculation
├── AI rating adjustment
├── Position ranking update
├── Squad selection scoring
└── Contract performance metrics
```

### **4. When Skills Assessment Changes**
```
skills Update → Triggers:
├── Position suitability recalculation
├── Training focus adjustment
├── AI rating skill component update
├── Squad selection algorithm impact
├── Development pathway modification
└── Player value skills multiplier
```

### **5. When Test Results Change**
```
testResults Update → Triggers:
├── Physical performance tracking
├── Fitness trend analysis
├── Training program adjustment
├── Injury risk recalculation
├── Position benchmark comparison
└── AI rating physical component
```

### **6. When GPS Data Changes (Real-time)**
```
GPS Data Update → Triggers:
├── Load management alerts
├── Fatigue monitoring
├── Performance trend analysis
├── Injury risk assessment
├── Recovery recommendations
└── Training load adjustments
```

---

## 📊 COMPLEX ANALYTICAL RELATIONSHIPS

### **Team Work Index (TWI) Calculation**
```sql
-- Position-based team cohesion analysis
SELECT 
  position,
  AVG(cohesionScore) as avgCohesion,
  AVG(communicationRating) as avgCommunication,
  AVG(leadershipRating) as avgLeadership,
  AVG(availabilityPercentage) as avgAvailability,
  COUNT(*) as playerCount
FROM players
GROUP BY rugbyProfile->>'primaryPosition'
```

### **Player Development Trajectory**
```sql
-- Tracks player improvement over time
WITH player_progress AS (
  SELECT 
    id,
    personalDetails->>'firstName' as firstName,
    personalDetails->>'lastName' as lastName,
    (aiRating->>'overall')::numeric as currentRating,
    LAG((aiRating->>'overall')::numeric, 1) OVER (
      PARTITION BY id ORDER BY (aiRating->>'lastUpdated')::timestamp
    ) as previousRating
  FROM players
)
SELECT *,
  (currentRating - previousRating) as improvementRate
FROM player_progress
WHERE previousRating IS NOT NULL
```

### **Squad Balance Analysis**
```sql
-- Analyzes squad composition and balance
SELECT 
  s.name as squadName,
  COUNT(ss.playerId) as totalPlayers,
  COUNT(CASE WHEN ss.isStarter = true THEN 1 END) as starters,
  AVG((p.cohesionMetrics->>'cohesionScore')::numeric) as avgCohesion,
  AVG((p.aiRating->>'overall')::numeric) as avgRating,
  AVG((p.cohesionMetrics->>'availabilityPercentage')::numeric) as avgAvailability
FROM squads s
JOIN squad_selections ss ON s.id = ss.squadId
JOIN players p ON ss.playerId = p.id
GROUP BY s.id, s.name
```

---

## 🔄 DATA INTEGRITY MANAGEMENT

### **Validation Rules**
```typescript
// Position-specific validation
const positionValidation = {
  'Front Row': {
    requiredSkills: ['scrummaging', 'lineoutThrowing'],
    minWeight: 100,
    maxWeight: 130
  },
  'Back Row': {
    requiredSkills: ['rucking', 'ballHandling'],
    minWeight: 95,
    maxWeight: 115
  },
  'Backs': {
    requiredSkills: ['passing', 'kicking'],
    minWeight: 75,
    maxWeight: 95
  }
}
```

### **Cascading Update Rules**
```typescript
// When player data changes
const cascadingUpdates = {
  'physicalAttributes': [
    'updateInjuryRisk',
    'recalculateAIRating',
    'adjustTrainingLoad',
    'updateContractValue'
  ],
  'injuries': [
    'updateMedicalScore',
    'adjustAvailability',
    'recalculateCohesion',
    'updateSquadEligibility'
  ],
  'skills': [
    'updatePositionSuitability',
    'adjustTrainingFocus',
    'recalculateAIRating',
    'updateSquadRanking'
  ]
}
```

### **Data Quality Monitoring**
```sql
-- Data completeness check
SELECT 
  'players' as table_name,
  COUNT(*) as total_records,
  COUNT(CASE WHEN personalDetails IS NOT NULL THEN 1 END) as personal_complete,
  COUNT(CASE WHEN skills IS NOT NULL THEN 1 END) as skills_complete,
  COUNT(CASE WHEN aiRating IS NOT NULL THEN 1 END) as ai_rating_complete,
  COUNT(CASE WHEN cohesionMetrics IS NOT NULL THEN 1 END) as cohesion_complete
FROM players
```

---

## 🎪 EXTERNAL DATA INTEGRATION POINTS

### **StatSports GPS Integration**
```typescript
// Real-time GPS data processing
interface GPSDataPoint {
  playerId: string;
  sessionId: string;
  timestamp: string;
  position: { x: number; y: number };
  speed: number;
  heartRate: number;
  playerLoad: number;
}

// Triggers when GPS data received
const processGPSData = (data: GPSDataPoint[]) => {
  // Update player load metrics
  // Trigger fatigue alerts
  // Update performance trends
  // Adjust training recommendations
}
```

### **Google Gemini AI Integration**
```typescript
// AI analysis triggers
const aiAnalysisTriggers = {
  'playerPerformance': {
    frequency: 'weekly',
    inputs: ['match_performances', 'gps_data', 'test_results'],
    outputs: ['aiRating', 'recommendations', 'injury_risk']
  },
  'squadAnalysis': {
    frequency: 'match_day',
    inputs: ['squad_selections', 'player_cohesion', 'opponent_data'],
    outputs: ['tactical_advice', 'selection_recommendations']
  }
}
```

### **Google Sheets Synchronization**
```typescript
// Bidirectional sync configuration
const sheetsSyncConfig = {
  'players_master': {
    direction: 'bidirectional',
    fields: ['personalDetails', 'rugbyProfile', 'physicalAttributes'],
    frequency: 'daily'
  },
  'match_reports': {
    direction: 'export_only',
    fields: ['match_performances', 'team_stats'],
    frequency: 'post_match'
  }
}
```

---

## 📈 REPORTING & ANALYTICS RELATIONSHIPS

### **Performance Dashboard Queries**
```sql
-- Individual player performance summary
SELECT 
  p.personalDetails->>'firstName' as firstName,
  p.personalDetails->>'lastName' as lastName,
  p.rugbyProfile->>'primaryPosition' as position,
  p.aiRating->>'overall' as overallRating,
  p.cohesionMetrics->>'cohesionScore' as cohesionScore,
  AVG(mp.carries) as avgCarries,
  AVG(mp.tacklesMade) as avgTackles,
  AVG(mp.gainlineMadePercent) as avgGainlineSuccess
FROM players p
LEFT JOIN match_performances mp ON p.id = mp.playerId
GROUP BY p.id, p.personalDetails, p.rugbyProfile, p.aiRating, p.cohesionMetrics
```

### **Squad Performance Analysis**
```sql
-- Squad effectiveness metrics
SELECT 
  s.name as squadName,
  s.matchDate,
  AVG((p.aiRating->>'overall')::numeric) as avgSquadRating,
  AVG((p.cohesionMetrics->>'cohesionScore')::numeric) as avgCohesion,
  COUNT(CASE WHEN (p.status->>'fitness') = 'available' THEN 1 END) as availablePlayers,
  COUNT(CASE WHEN (p.status->>'fitness') = 'injured' THEN 1 END) as injuredPlayers
FROM squads s
JOIN squad_selections ss ON s.id = ss.squadId
JOIN players p ON ss.playerId = p.id
GROUP BY s.id, s.name, s.matchDate
```

---

## 📋 SUMMARY: KEY DATA RELATIONSHIP INSIGHTS

### **Most Critical Relationships**
1. **Player → Match Performance** - Drives all performance analytics
2. **Player → Cohesion Metrics** - Affects team selection and value
3. **Player → AI Rating** - Influences recruitment and development decisions
4. **Match Performance → Squad Selection** - Tactical and strategic decisions
5. **Injury Status → Availability** - Operational team management

### **Highest Impact Cascading Effects**
1. **Injury Status Change** - Affects 7+ related metrics
2. **Match Performance Update** - Triggers 6+ calculations
3. **Physical Attributes Change** - Impacts 5+ systems
4. **Skills Assessment Update** - Influences 4+ algorithms

### **External Integration Dependencies**
- **StatSports GPS**: Real-time performance data
- **Google Gemini AI**: Automated analysis and insights
- **Google Sheets**: Manual data entry and synchronization
- **Medical Systems**: Injury tracking and treatment

### **Data Quality Priorities**
1. **Player Identity**: personalDetails, rugbyProfile
2. **Performance Metrics**: match_performances, gps_data
3. **Availability Status**: injuries, medical status
4. **Team Impact**: cohesionMetrics, skills ratings
5. **AI Enhancement**: aiRating, automated insights

This comprehensive data schema mapping shows exactly how all data elements relate to each other and the cascading effects of changes throughout the North Harbour Rugby Performance Hub system.