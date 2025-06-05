# Rugby Performance Hub - Quick Deployment Prompt

Create a professional rugby performance analytics platform with comprehensive player tracking, AI-powered insights, and GPS data integration.

## Project Requirements

**Tech Stack:** React + TypeScript, Node.js + Express, PostgreSQL, TailwindCSS + shadcn/ui, OpenAI GPT-4o, StatSports GPS integration

**Core Features:**
1. **Player Management** - Complete profiles, positions, physical attributes, skills assessment
2. **AI Analytics** - Performance analysis, injury prediction, development recommendations  
3. **GPS Tracking** - StatSports integration, movement analytics, player load monitoring
4. **Dashboard** - 10-tab horizontal navigation (Overview, Metrics, Medical, Training, Compare, Messages, Video, Live Match, AI Predict, GPS)
5. **Database** - Full player data model with time-series tracking

## Environment Setup
```
DATABASE_URL=postgresql://...
OPENAI_API_KEY=sk-...
STATSPORTS_API_KEY=... (optional)
STATSPORTS_TEAM_ID=... (optional)
```

## Key Dependencies
```bash
npm install express drizzle-orm @neondatabase/serverless @tanstack/react-query wouter openai zod drizzle-zod @radix-ui/react-* tailwindcss lucide-react react-hook-form framer-motion
```

## Database Schema
Create comprehensive player table with:
- Personal details and emergency contacts
- Rugby profile (positions, jersey numbers, experience)
- Physical attributes with time-series data
- Game statistics by season
- Skills matrix (1-10 ratings)
- Injury and medical records
- Training programs and GPS sessions

## Dashboard Layout
Horizontal tab navigation with:
1. **Overview** - Platform summary and feature grid
2. **Metrics** - Advanced performance analytics with charts
3. **Medical** - Injury tracking and health status
4. **Training** - Program management and scheduling
5. **Compare** - Player benchmarking and comparisons
6. **Messages** - Team communication system
7. **Video** - Analysis integration and footage review
8. **Live Match** - Real-time analytics during games
9. **AI Predict** - Injury and performance predictions
10. **GPS** - StatSports movement analytics with sub-tabs (Overview, Movement, Load & Recovery, Sessions)

## Color Scheme
```css
--primary: #8B1538 (team red)
--secondary: #1E3A5F (navy blue)  
--accent: #FFD700 (gold)
```

## Core Components
- Player selector dropdown with current player display
- Responsive card layouts with metrics and charts
- AI-powered summary cards with confidence scores
- GPS tracking with distance zones and heart rate analysis
- Injury risk assessment with visual indicators
- Performance comparison charts and benchmarks

## AI Integration
- Use OpenAI GPT-4o for player analysis
- Implement structured JSON responses
- Include injury risk assessment with confidence scoring
- Generate development recommendations based on comprehensive data
- Provide match performance insights

## GPS Features
- Real-time movement analytics
- Distance tracking with zone breakdowns (walking, jogging, running, high-speed, sprinting)
- Speed metrics (max, average)
- Player load and load per minute
- Acceleration/deceleration counts
- Heart rate zone analysis
- Impact tracking and recovery metrics

## Sample Data
Include realistic data for 5 players with:
- Complete rugby profiles and statistics
- GPS training sessions with authentic metrics
- Injury history and medical records
- Skills assessments and performance ratings

## Implementation Notes
- Use TanStack React Query for data fetching
- Implement responsive design with mobile support
- Create modular component architecture
- Use Drizzle ORM with PostgreSQL
- Include proper error handling and loading states
- Implement role-based access control

## Customization
The system should be easily adaptable for other teams by:
- Updating team colors and branding
- Modifying player positions for different sports
- Adjusting metrics for sport-specific requirements
- Customizing AI analysis prompts

Build a professional, production-ready platform that rugby coaches and analysts can use for comprehensive player development and performance tracking.