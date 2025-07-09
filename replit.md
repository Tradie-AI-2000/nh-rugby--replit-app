# North Harbour Rugby Performance Hub

## Overview

The North Harbour Rugby Performance Hub is a comprehensive digital platform designed to transform rugby performance management through data-driven analytics and AI-powered insights. This application serves as a centralized system for player development tracking, injury prevention, GPS performance analysis, and team cohesion analytics.

The platform supports multiple user roles including coaches, medical staff, physiotherapists, team managers, and administrators, each with specific permissions and access levels. It integrates modern web technologies with external services like StatSports GPS, Google Gemini AI, and Google Sheets for comprehensive rugby analytics.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript and Vite build system
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack React Query for server state management
- **UI Components**: shadcn/ui components built on Radix UI primitives
- **Styling**: TailwindCSS with custom North Harbour Rugby brand colors
- **Form Handling**: React Hook Form with Zod validation

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript for type safety
- **Database ORM**: Drizzle ORM for type-safe database operations
- **Build System**: ESBuild for production bundling
- **Development**: TSX for TypeScript execution in development

### Database Architecture
- **Primary Database**: PostgreSQL via Neon serverless
- **Schema Management**: Drizzle migrations with declarative schema
- **Connection**: Connection pooling via @neondatabase/serverless
- **Time-series Data**: JSON fields for tracking historical metrics

## Key Components

### Player Management System
- Comprehensive player profiles with personal details, rugby statistics, and physical attributes
- Time-series tracking for physical attributes, test results, and performance metrics
- Skills assessment system with 1-10 rating scales
- Injury tracking and medical status monitoring
- Emergency contact management and communication preferences

### AI Analytics Engine
- Google Gemini AI integration for performance analysis and insights
- Automated player analysis with strength/weakness identification
- Injury risk prediction with confidence scoring
- Match performance analysis and tactical recommendations
- Development pathway suggestions based on comprehensive data analysis

### GPS Tracking Integration
- StatSports GPS API integration framework
- Real-time movement analytics (distance, speed, acceleration)
- Player load monitoring and recovery metrics
- Heart rate zone analysis and impact tracking
- Session-by-session performance comparison and data quality scoring

### Role-Based Access Control
- Hierarchical permission system supporting 10 distinct user roles
- Granular permissions for data access, editing, and administrative functions
- Protected routes and components based on user role and permissions
- Authentication flow with role selection and session management

### Medical and Injury Management
- Comprehensive injury tracking with severity classifications
- Medical appointment scheduling and management
- Recovery timeline tracking and clearance workflows
- Integration with training load management
- Automated alerts for injury risk factors

## Data Flow

### Data Input Sources
1. **Manual Entry**: Direct data input through forms and interfaces
2. **CSV Upload**: Bulk data import with validation and error handling
3. **GPS API**: Automated StatSports data synchronization
4. **Google Sheets**: Integration for existing data sources
5. **AI Analysis**: Generated insights and recommendations

### Data Processing Pipeline
1. **Validation**: Input validation using Zod schemas
2. **Integrity Management**: Automated data relationship maintenance
3. **Time-series Aggregation**: Historical data compilation and trend analysis
4. **AI Enhancement**: Machine learning insights and predictions
5. **Export Generation**: CSV and report generation for external use

### Data Relationships
- Players serve as the central entity with relationships to all other data types
- Physical attributes and test results maintain temporal relationships
- Game statistics link to specific matches and opponents
- Injury records connect to training modifications and recovery protocols
- GPS data correlates with training sessions and match performances

## External Dependencies

### Core Infrastructure
- **Neon PostgreSQL**: Serverless database hosting with automatic scaling
- **Vercel/Replit**: Application hosting and deployment platform
- **Google Cloud**: AI services and authentication

### AI and Analytics
- **Google Gemini AI**: Advanced rugby performance analysis and insights
- **OpenAI GPT-4**: Alternative AI analysis capabilities
- **StatSports API**: Professional GPS tracking data integration

### Third-party Services
- **Google Sheets API**: Legacy data integration and reporting
- **SendGrid**: Email notifications and communications
- **Slack API**: Team communication integration

### Development Tools
- **Drizzle Kit**: Database migration and schema management
- **ESBuild**: Fast TypeScript compilation and bundling
- **Vite**: Development server with hot module replacement

## Deployment Strategy

### Development Environment
- Local development with Vite dev server
- Database connection to Neon development instance
- Environment variables for API keys and configuration
- Hot reloading for rapid development iteration

### Production Deployment
- Automated build process using `npm run build`
- Static asset generation and optimization
- Database migrations via Drizzle Kit
- Environment-specific configuration management

### Scaling Considerations
- Serverless database with automatic scaling
- Stateless application design for horizontal scaling
- CDN integration for static asset delivery
- API rate limiting and request optimization

## Changelog
- January 9, 2025: Fixed database connection timeout by replacing Neon serverless adapter with standard PostgreSQL driver for Google Cloud SQL compatibility
- June 26, 2025: Initial setup

## User Preferences

Preferred communication style: Simple, everyday language.