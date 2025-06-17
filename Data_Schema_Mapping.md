# North Harbour Rugby - Complete Data Schema Mapping

## Overview
This document maps all data structures in the North Harbour Rugby system, showing how they interconnect and relate to each other.

## Core Player Data Structure

### Personal Details
- `firstName`, `lastName` - Basic identification
- `dateOfBirth` - Age calculation, eligibility
- `email`, `phone` - Communication
- `address` - Location data
- `emergencyContact` - Safety protocols
- `profileImageUrl` - Avatar display

### Rugby Profile
- `jerseyNumber` - Unique identifier on field
- `primaryPosition`, `secondaryPositions` - Tactical positioning
- `playingLevel` - Professional/Amateur classification
- `yearsInTeam` - Experience/cohesion metrics
- `previousClubs` - History tracking
- `representativeHonours` - Achievement tracking
- `dateJoinedClub` - Tenure calculations

### Physical Attributes (Time Series)
```json
{
  "date": "2024-01-01",
  "weight": 95,
  "height": 185,
  "bodyFat": 12.5,
  "leanMass": 83.1
}
```
**Relationships:**
- Links to fitness trends
- Affects GPS performance calculations
- Influences injury risk models
- Updates player value metrics

### Test Results (Performance Tracking)
```json
{
  "date": "2024-01-15",
  "testType": "bench_press|squat|sprint_40m|yo_yo|bronco|vo2_max",
  "value": 120,
  "unit": "kg"
}
```
**Relationships:**
- Feeds into AI analysis
- Creates fitness progression charts
- Influences training program assignment
- Affects team selection metrics

### Game Statistics (Match Performance)
```json
{
  "season": "2024",
  "matchesPlayed": 15,
  "minutesPlayed": 1200,
  "tries": 3,
  "tackles": 95,
  "lineoutWins": 45,
  "turnovers": 12,
  "penalties": 6
}
```
**Relationships:**
- Updates player rankings
- Feeds cohesion analytics
- Influences contract value
- Creates performance comparisons

### Skills Assessment (1-10 Scale)
```json
{
  "ballHandling": 8,
  "passing": 9,
  "kicking": 7,
  "lineoutThrowing": 9,
  "scrummaging": 6,
  "rucking": 8,
  "defense": 7,
  "communication": 9
}
```
**Relationships:**
- Position-specific weightings
- Training focus identification
- Team selection algorithms
- Player development tracking

### Advanced GPS Metrics
```json
{
  "distanceCovered": 4500,
  "topSpeed": 28.5,
  "sprintCount": 12,
  "averageHeartRate": 165,
  "maxHeartRate": 190,
  "caloriesBurned": 850,
  "workRate": 92,
  "discipline": 88,
  "communication": 91,
  "leadership": 85
}
```
**Relationships:**
- Real-time from StatSports API
- Updates fitness status
- Triggers injury alerts
- Affects load management

### Injury Tracking (Medical Integration)
```json
{
  "type": "acute|chronic|overuse",
  "severity": "minor|moderate|severe|critical",
  "bodyPart": "hamstring",
  "dateOccurred": "2024-01-15",
  "expectedReturn": "2024-02-01",
  "status": "recovering",
  "treatmentPlan": [...],
  "restrictions": ["no contact", "50% load"]
}
```
**Relationships:**
- Affects availability status
- Updates medical dashboard
- Triggers coaching notifications
- Influences insurance/contracts

### Reports (Multi-Source)
```json
{
  "type": "coach|medical|strength_conditioning|recruitment",
  "title": "Performance Review",
  "content": "Detailed analysis...",
  "author": "Coach Thompson",
  "date": "2024-01-15"
}
```
**Relationships:**
- Cross-references performance data
- Links to video analysis
- Feeds into AI insights
- Creates action items

### Video Analysis
```json
{
  "title": "Match Highlights vs Auckland",
  "videoUrl": "...",
  "analysisType": "highlight|skill_focus|tactical",
  "keyMoments": [
    {
      "timestamp": 45,
      "category": "lineout",
      "description": "Perfect throw under pressure"
    }
  ],
  "metrics": {
    "tackles": 12,
    "carries": 8,
    "lineoutSuccess": 95
  }
}
```
**Relationships:**
- Links to match statistics
- Validates GPS data
- Supports coaching decisions
- Creates highlight reels

### AI Rating System
```json
{
  "overall": 87,
  "physicality": 92,
  "skillset": 85,
  "gameImpact": 89,
  "potential": 84,
  "lastUpdated": "2024-03-20"
}
```
**Relationships:**
- Aggregates all data sources
- Updates automatically with new data
- Influences team selection
- Drives recruitment decisions

## Data Interconnections

### Player Value Calculation
```
Contract Value = Base Value + Performance Bonus + Attendance Score + Medical Score + AI Rating
```

### Team Selection Algorithm
```
Selection Score = Position Rating + Form + Fitness + Availability + Cohesion Impact
```

### Injury Risk Model
```
Risk Score = Load vs Capacity + Injury History + Fatigue Markers + Age Factor
```

### Cohesion Analytics
```
TWI = Experience Differential + Position Familiarity + Communication Rating + Game Time Together
```

## Data Sources & Updates

### Real-Time Sources
- **StatSports GPS**: Live training/match data
- **Google Sheets**: Manual data entry
- **Medical Staff**: Injury/treatment updates
- **Coaching Staff**: Performance ratings
- **AI Analysis**: Automated insights

### Data Cascade Effects
When any data point changes, it triggers updates across:
1. Player value calculations
2. Team selection metrics
3. Injury risk assessments
4. Cohesion analytics
5. Training load recommendations
6. Contract performance indicators

## Template Requirements vs Reality

### Current Basic Template
```csv
player_id,first_name,last_name,position,jersey_number
```

### Required Comprehensive Template
```csv
# Personal Details (10 fields)
# Rugby Profile (8 fields)
# Physical Attributes (5 fields)
# Skills Assessment (8 fields)
# Contact Information (4 fields)
# Medical Status (6 fields)
# Contract Details (4 fields)
# Performance Metrics (15+ fields)
# Total: 60+ interconnected fields
```

## Missing Templates Needed

1. **Complete Player Profile Template** (60+ fields)
2. **Match Performance Detailed** (25+ fields including GPS)
3. **Training Session Data** (20+ fields)
4. **Medical Assessment** (15+ fields)
5. **Skills Evaluation** (12+ fields)
6. **Video Analysis Metadata** (10+ fields)
7. **Cohesion Markers** (15+ fields)
8. **Contract & Value Tracking** (8+ fields)

## Data Relationships Map

```
Player Profile
├── Personal Details
├── Rugby Profile
├── Physical Attributes ──→ Fitness Trends
├── Test Results ──→ Performance Analytics
├── Game Statistics ──→ Team Selection
├── Skills Assessment ──→ Training Focus
├── GPS Data ──→ Load Management
├── Injury Records ──→ Medical Dashboard
├── Reports ──→ Action Items
├── Videos ──→ Coaching Tools
└── AI Ratings ──→ Recruitment
```

Each data point connects to multiple other systems, creating a web of dependencies that must be maintained for accurate analytics and decision-making.