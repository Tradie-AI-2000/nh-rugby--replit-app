# North Harbour Rugby Performance Hub - Complete Replication Guide

## Project Overview
Create a professional rugby performance analytics platform for comprehensive player development tracking, featuring AI-powered insights, StatSports GPS data integration, and real-time performance management.

## Core Technologies
- **Frontend**: React + TypeScript + Vite
- **Backend**: Node.js + Express + TypeScript  
- **Database**: PostgreSQL with Drizzle ORM
- **Styling**: TailwindCSS + shadcn/ui components
- **Analytics**: OpenAI GPT-4o integration
- **GPS Integration**: StatSports API ready
- **Query Management**: TanStack React Query

## Key Features Implementation

### 1. Player Management System
- Complete player profiles with personal details, rugby stats, physical attributes
- Jersey number tracking and position management
- Injury history and medical status monitoring
- Skills assessment (1-10 rating system)
- Performance reports and activity logging

### 2. AI-Powered Analytics
- OpenAI GPT-4o integration for player performance analysis
- Automated strength/weakness identification
- Injury risk prediction with confidence scoring
- Development recommendations based on comprehensive data analysis
- Match performance insights

### 3. GPS Tracking Integration
- StatSports API integration framework
- Real-time movement analytics (distance, speed, acceleration)
- Player load monitoring and recovery metrics
- Heart rate zone analysis
- Impact tracking and data quality scoring
- Session-by-session performance comparison

### 4. Comprehensive Dashboard
- Horizontal tab navigation with 10 main sections:
  - Overview (platform summary)
  - Metrics (advanced performance analytics)
  - Medical (injury tracking and health status)
  - Training (program management)
  - Compare (player benchmarking)
  - Messages (team communication)
  - Video (analysis integration)
  - Live Match (real-time analytics)
  - AI Predict (injury and performance prediction)
  - GPS (StatSports movement analytics)

### 5. Database Schema
Complete player data model including:
- Personal details and emergency contacts
- Rugby profile (positions, experience, club history)
- Physical attributes with time-series tracking
- Test results and fitness assessments
- Game statistics by season
- Skills matrix evaluation
- Injury and medical records
- Training programs and activities
- Video analysis data
- GPS session tracking

## Technical Architecture

### Frontend Structure
```
client/src/
├── components/
│   ├── ui/ (shadcn components)
│   ├── player-overview.tsx
│   ├── advanced-metrics.tsx
│   ├── injury-tracking.tsx
│   ├── physical-performance.tsx
│   ├── game-statistics.tsx
│   ├── player-comparison.tsx
│   ├── ai-summary.tsx
│   ├── gps-tracking.tsx
│   └── ...
├── pages/
│   └── features-demo.tsx (main dashboard)
├── hooks/
│   └── useAuth.ts
└── lib/
    └── queryClient.ts
```

### Backend Structure
```
server/
├── routes.ts (all API endpoints)
├── storage.ts (database operations)
├── db.ts (database connection)
├── aiAnalysis.ts (OpenAI integration)
├── statSportsGPS.ts (GPS data handling)
└── index.ts (server setup)
```

### Database Schema
```
shared/schema.ts
├── users (authentication)
├── players (complete rugby profiles)
├── sessions (auth storage)
└── Zod validation schemas
```

## Environment Variables Required
```
DATABASE_URL=postgresql://...
OPENAI_API_KEY=sk-...
STATSPORTS_API_KEY=... (optional)
STATSPORTS_TEAM_ID=... (optional)
GOOGLE_CLIENT_EMAIL=... (optional)
GOOGLE_PRIVATE_KEY=... (optional)
```

## Installation & Setup

### 1. Project Initialization
```bash
npm create vite@latest rugby-hub -- --template react-ts
cd rugby-hub
```

### 2. Dependencies Installation
```bash
# Core dependencies
npm install express drizzle-orm @neondatabase/serverless
npm install @tanstack/react-query wouter
npm install @radix-ui/react-* (all shadcn components)
npm install tailwindcss @tailwindcss/typography
npm install openai zod drizzle-zod
npm install lucide-react react-hook-form @hookform/resolvers
npm install framer-motion date-fns

# Development dependencies  
npm install -D @types/express @types/node typescript tsx
npm install -D tailwindcss postcss autoprefixer
npm install -D drizzle-kit
```

### 3. Configuration Files

#### tailwind.config.ts
```typescript
import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        'nh-red': '#8B1538',
        'nh-navy': '#1E3A5F',
        'nh-gold': '#FFD700',
      }
    }
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")]
} satisfies Config;
```

#### vite.config.ts
```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './client/src'),
      '@shared': path.resolve(__dirname, './shared'),
      '@assets': path.resolve(__dirname, './attached_assets')
    }
  },
  server: {
    proxy: {
      '/api': 'http://localhost:5000'
    }
  }
});
```

#### drizzle.config.ts
```typescript
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  dialect: 'postgresql',
  schema: './shared/schema.ts',
  out: './drizzle',
  dbCredentials: {
    url: process.env.DATABASE_URL!
  }
});
```

### 4. Package.json Scripts
```json
{
  "scripts": {
    "dev": "NODE_ENV=development tsx server/index.ts",
    "build": "tsc && vite build",
    "db:push": "drizzle-kit push",
    "db:studio": "drizzle-kit studio"
  }
}
```

## Core Implementation Steps

### 1. Database Setup
- Create PostgreSQL database using Replit's database tool
- Implement complete schema in `shared/schema.ts`
- Set up Drizzle ORM with proper relations
- Run `npm run db:push` to create tables

### 2. Authentication System
- Implement user management with role-based permissions
- Create storage interface for database operations
- Set up session management

### 3. Player Data Management
- Build comprehensive player profile system
- Implement CRUD operations for all player data
- Create data validation with Zod schemas

### 4. AI Integration
- Set up OpenAI API with GPT-4o model
- Implement player analysis functions
- Create injury prediction algorithms
- Build performance rating systems

### 5. GPS Integration Framework
- Implement StatSports API service structure
- Create GPS data models and validation
- Build real-time data processing pipeline
- Set up sample data for testing

### 6. Dashboard Components
- Create modular component system
- Implement horizontal tab navigation
- Build responsive card layouts
- Add interactive charts and visualizations

### 7. API Endpoints
Complete REST API covering:
- Player CRUD operations
- AI analysis endpoints
- GPS data retrieval
- Team management functions
- Performance analytics

## Customization for Other Teams

### 1. Team Branding
Update colors in `tailwind.config.ts`:
```typescript
colors: {
  'team-primary': '#YOUR_PRIMARY_COLOR',
  'team-secondary': '#YOUR_SECONDARY_COLOR',
  'team-accent': '#YOUR_ACCENT_COLOR'
}
```

### 2. Team Data
- Replace North Harbour Rugby references
- Update team logo in assets
- Modify player positions for your sport
- Adjust metrics for sport-specific requirements

### 3. Sport-Specific Adaptations
- Modify skills assessment categories
- Update performance metrics
- Adjust GPS tracking parameters
- Customize AI analysis prompts

### 4. Database Customization
- Add sport-specific fields to player schema
- Modify game statistics structure
- Update training program templates
- Customize injury tracking categories

## Deployment

### Replit Deployment
1. Create new Replit project
2. Import code repository
3. Set environment variables in Replit Secrets
4. Run `npm install` and `npm run db:push`
5. Start application with `npm run dev`
6. Use Replit's deployment feature for production

### External Deployment
- Vercel/Netlify for frontend
- Railway/Render for backend
- Neon/Supabase for PostgreSQL database

## API Integration Requirements

### OpenAI API
- Required for AI-powered analytics
- Uses GPT-4o model for comprehensive analysis
- Implements structured JSON responses

### StatSports API (Optional)
- Professional GPS tracking integration
- Requires team account and API credentials
- Real-time movement analytics

### Google Sheets API (Optional)
- Bulk data import/export functionality
- Team roster synchronization
- Performance data backup

## Sample Data Structure

The system includes comprehensive sample data for:
- 5 North Harbour Rugby players with complete profiles
- GPS tracking sessions with realistic metrics
- Game statistics across multiple seasons
- Injury history and medical records
- Training programs and activities

## Security Considerations

### Data Protection
- Environment variable management
- Secure API key handling
- Database connection encryption
- User authentication and authorization

### Performance Optimization
- React Query for efficient data fetching
- Component memoization
- Lazy loading for large datasets
- Database indexing for fast queries

## Support and Maintenance

### Regular Updates
- Keep dependencies updated
- Monitor API rate limits
- Backup database regularly
- Update AI prompts for better analysis

### Scaling Considerations
- Database query optimization
- Component code splitting
- CDN for static assets
- Load balancing for high traffic

This replication guide provides everything needed to create a professional rugby performance analytics platform that can be customized for any team or sport. The modular architecture allows for easy adaptation while maintaining the core functionality and professional appearance.