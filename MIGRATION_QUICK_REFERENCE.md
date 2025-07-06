# 🏉 North Harbour Rugby - Migration Quick Reference

## **Pre-Migration Checklist**

### **1. Run Migration Script**
```bash
# In your current Replit project
npx tsx scripts/migrate-to-google-cloud.ts
```

**Output Files Created:**
- `migration-data/complete-export.json` - Full backup
- `migration-data/import-to-google-cloud.sql` - Import script
- `migration-data/players.csv` - Player data
- `migration-data/squads.csv` - Squad data  
- `migration-data/match_try_data.csv` - Match analysis

### **2. Google Cloud Project Setup Sequence**
```
✓ Create project: north-harbour-rugby-dashboard
✓ Enable APIs: Cloud SQL, Generative AI, Sheets
✓ Set up billing and budget alerts
✓ Create Cloud SQL PostgreSQL instance
✓ Create database: rugby_performance
✓ Create user: rugby_admin
✓ Get connection details
```

### **3. Data Import to Google Cloud SQL**
```
1. Go to: Cloud Console → SQL → Query
2. Copy contents of import-to-google-cloud.sql
3. Execute in Query interface
4. Verify with: SELECT COUNT(*) FROM players;
```

### **4. Update Rugby App Configuration**
```env
# New environment variables
DATABASE_URL=postgresql://rugby_admin:PASSWORD@CLOUD_SQL_IP:5432/rugby_performance
GEMINI_API_KEY=[New Google Cloud API key]
GOOGLE_CLIENT_EMAIL=[Service account email]
GOOGLE_PRIVATE_KEY=[Service account private key]
```

### **5. API Keys Migration**
```
Current Location → New Location:
- Gemini API → Google Cloud Project API key
- Google Sheets → Service account credentials
- Database → Cloud SQL connection string
```

## **Cost Breakdown Estimate**

### **Google Cloud SQL (Primary Cost)**
- **db-f1-micro instance:** $7-15/month
- **10GB SSD storage:** $1-2/month
- **Backup storage:** $0.50-1/month

### **Gemini API (Usage-Based)**
- **Text generation:** $0.000125 per 1K characters
- **Typical rugby analysis:** $5-20/month
- **Heavy AI usage:** $20-50/month

### **Networking & Other**
- **Data transfer:** $1-3/month
- **Operations:** $0.50-1/month

**Total Monthly: $15-40** (typical rugby club usage)

## **Migration Day Schedule**

### **Morning (Setup - 2 hours)**
1. **Create Google Cloud project** (30 min)
2. **Set up Cloud SQL instance** (45 min)
3. **Run data export script** (15 min)
4. **Import data to Cloud SQL** (30 min)

### **Afternoon (Testing - 2 hours)**
1. **Update rugby app environment** (30 min)
2. **Test database connectivity** (30 min)
3. **Verify AI functionality** (30 min)
4. **Test Google Sheets sync** (30 min)

### **Evening (Training - 1 hour)**
1. **Staff access setup** (30 min)
2. **Basic operations training** (30 min)

## **Rollback Plan (If Issues)**

### **Immediate Rollback**
```
1. Revert DATABASE_URL to original Replit database
2. Revert API keys to original values
3. Test rugby app functionality
4. Investigate issues with Google Cloud setup
```

### **Data Recovery**
```
1. Original data preserved in Replit
2. JSON backup in migration-data/complete-export.json
3. CSV exports for manual recovery
4. Cloud SQL backups (if any data was added)
```

## **Post-Migration Verification**

### **Database Functionality**
```sql
-- Verify data import
SELECT COUNT(*) FROM players;
SELECT COUNT(*) FROM squads;
SELECT COUNT(*) FROM "matchTryData";

-- Test basic operations
SELECT * FROM players LIMIT 5;
UPDATE players SET "currentStatus" = 'Fit' WHERE id = 1;
```

### **Rugby App Features**
```
✓ Squad Builder loads players
✓ Player profiles display correctly
✓ Match analysis shows try data
✓ Medical Hub shows injury status
✓ Reports generate properly
```

### **AI Integration**
```
✓ Gemini API responses working
✓ Player analysis generating
✓ Match insights functioning
✓ Performance recommendations active
```

### **Google Sheets Sync**
```
✓ Sheets API authentication working
✓ Data sync endpoints responding
✓ Player updates flowing to database
✓ Real-time sync functioning
```

## **Staff Training Points**

### **Google Cloud Console Access**
```
1. Go to: console.cloud.google.com
2. Select: north-harbour-rugby-dashboard
3. Navigate: SQL → rugby_performance
4. Use: Query interface for data management
```

### **Common Operations**
```sql
-- Check player availability
SELECT "firstName", "lastName", "currentStatus" FROM players;

-- Update injury status
UPDATE players SET "currentStatus" = 'Injured' WHERE "jerseyNumber" = 7;

-- Export match day squad
SELECT * FROM players WHERE "currentStatus" = 'Fit';
```

### **Emergency Contacts**
```
Technical Issues: TradieAI support
Database Problems: Google Cloud SQL support
Rugby App Issues: Development team
Google Sheets: Google Workspace admin
```

This migration gives North Harbour Rugby professional-grade infrastructure while maintaining simple operations for rugby staff.