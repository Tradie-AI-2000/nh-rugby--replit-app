# 🏉 North Harbour Rugby Database Management Guide
### Complete Guide for Non-Technical Staff

---

## 📍 **PART 1: Accessing Your Database (Neon PostgreSQL)**

### **Where to Find Your Database**

**Step 1: Go to Neon Console**
```
1. Open your web browser
2. Go to: https://console.neon.tech
3. Sign in with your Neon account credentials
```

**Step 2: Find Your Project**
```
1. Look for "North Harbour Rugby" project (or similar name)
2. Click on the project name
3. You'll see your database dashboard
```

### **What You'll See in Neon Console**

**Dashboard Overview:**
- Database status (should show "Active")
- Storage usage (how much data you're storing)
- Query statistics (how many database calls per day)
- Recent activity log

**Tables Tab:**
- Click "Tables" to see all your data tables
- Main tables you'll care about:
  - `players` - All player information
  - `squads` - Team selections
  - `matchTryData` - Match analysis data

### **Viewing Your Data**

**Simple Data Browser:**
```
1. In Neon Console, click "Tables"
2. Click on "players" table
3. Click "Browse Data" 
4. You can see all player records in a spreadsheet-like view
```

**What You Can See:**
- Player names, positions, jersey numbers
- Current status (Fit, Injured, Suspended)
- Game statistics and performance data
- Medical information and injury history

---

## 🔧 **PART 2: Making Direct Database Changes (Emergency Only)**

### **⚠️ CRITICAL WARNINGS FIRST**

**Before Making Any Changes:**
1. **ALWAYS make a backup** - In Neon Console, go to "Backups" → "Create Backup"
2. **Test changes on one player first** before bulk edits
3. **Never delete entire tables** - this will break your app
4. **Double-check player names/IDs** - typos can cause issues

### **Simple Data Editing**

**Method 1: Neon Console (Simplest)**
```
1. Go to Neon Console → Tables → players
2. Click "Browse Data"
3. Find the player you want to edit
4. Click the pencil icon next to their row
5. Make your changes
6. Click "Save"
```

**Common Safe Edits:**
- Change player status: "Fit" → "Injured" → "Suspended"
- Update jersey numbers (make sure they're unique)
- Modify basic stats like weight, height
- Update contact information

**Method 2: Using a Database Tool (More Advanced)**
```
Download: DBeaver (free database browser)
1. Install DBeaver on your computer
2. Connect using your Neon database URL
3. Browse tables in a familiar spreadsheet interface
4. Make edits with right-click → Edit
```

### **What NOT to Touch**
- `id` fields (these are unique identifiers)
- `createdAt` or `updatedAt` timestamps
- Complex JSON fields unless you understand the structure
- Any table structure/columns themselves

---

## 📊 **PART 3: Google Sheets Integration (Primary Data Management)**

### **How Data Flows: The Complete Picture**

```
Google Sheets → API Sync → Neon Database → Rugby App Frontend
```

### **Step-by-Step: From Sheets to App**

**Step 1: Your Google Sheet Setup**
```
Create a Google Sheet with these exact column headers:
A: Player Name
B: Position  
C: Jersey Number
D: Weight (kg)
E: Height (cm)
F: Age
G: Fitness Score (1-10)
H: Injury Status (Fit/Injured/Suspended)
I: Last Match Date
J: GPS Distance (meters)
K: Top Speed (km/h)
L: Tackles (season total)
M: Carries (season total)
N: Pass Accuracy (percentage)
```

**Step 2: Making Data Changes**
```
1. Open your Google Sheet
2. Edit any player data you need to change
3. Save the sheet (Ctrl+S or Cmd+S)
```

**Step 3: Syncing to Database**
```
Option A: Manual Sync (Current Setup)
1. Open your Rugby App
2. Go to Admin/Settings section
3. Click "Sync from Google Sheets"
4. Enter your Google Sheet ID
5. Click "Import Data"

Option B: Automatic Sync (Would need to be set up)
- Data automatically syncs every hour
- No manual action required
```

**Step 4: Data Appears in App**
```
Once synced:
1. Player changes appear immediately on all pages
2. Squad Builder shows updated availability
3. Medical Hub reflects new injury statuses
4. Player profiles display latest stats
5. Reports include updated data
```

### **Your Current API Endpoints Explained**

**What happens when you sync:**
```
POST /api/sheets/sync-all
- Reads your entire Google Sheet
- Transforms data to match rugby app format
- Updates player records in Neon database
- Returns success/error message

POST /api/sheets/sync-matches  
- Imports match-specific data
- Updates game statistics
- Calculates performance metrics
```

**How to Trigger These:**
Currently, these are triggered through the app interface when you click sync buttons. The app makes these API calls automatically.

---

## 💰 **PART 4: Cost Monitoring and Control**

### **Understanding Neon Costs**

**Main Cost Drivers:**
1. **Storage** - How much data you store (player records, match data)
2. **Compute** - How many database operations per month
3. **Data Transfer** - Moving data in/out of database

**Typical North Harbour Usage Costs:**
- Small club (50 players): $0-20/month
- Medium club (100+ players): $20-50/month  
- Large operations (multiple teams): $50-100/month

### **Cost Monitoring Dashboard**

**Step 1: Check Usage**
```
1. Go to Neon Console
2. Click "Billing" or "Usage" tab
3. View current month's consumption
```

**Step 2: Set Up Alerts**
```
1. In Neon Console → Settings
2. Set spending alerts (e.g., notify at $25/month)
3. Add your email for notifications
```

**Step 3: Monitor Key Metrics**
- **Storage**: Should grow slowly unless adding lots of players
- **Compute**: Spikes during heavy app usage (match days)
- **Queries**: Should be consistent unless experiencing issues

### **Cost Control Tips**
1. **Regular cleanup** - Archive old seasons annually
2. **Optimize images** - Compress player photos before upload
3. **Monitor sync frequency** - Don't sync Google Sheets more than needed
4. **Review usage monthly** - Check for unexpected spikes

---

## 🔄 **PART 5: Complete Workflow for Staff**

### **Daily Operations**

**Morning Routine:**
```
1. Check injury updates in Google Sheets
2. Update player availability status
3. Click "Sync Data" in rugby app
4. Verify changes appear in Squad Builder
```

**Match Day Routine:**
```
1. Update squad selections in app
2. Record match statistics
3. Update injury status post-match
4. Sync any changes from medical staff sheets
```

**Weekly Routine:**
```
1. Review player performance data
2. Update training loads in Google Sheets
3. Check database costs in Neon Console
4. Backup important data
```

### **Troubleshooting Common Issues**

**Problem: Google Sheets sync fails**
```
Solution:
1. Check internet connection
2. Verify Google Sheet permissions
3. Ensure sheet format matches template
4. Try syncing smaller data sections first
```

**Problem: Player data not updating**
```
Solution:
1. Check if sync completed successfully
2. Refresh the rugby app page
3. Verify correct player ID in sheets
4. Clear browser cache
```

**Problem: High database costs**
```
Solution:
1. Check usage dashboard in Neon
2. Look for unusual activity spikes
3. Review sync frequency
4. Contact IT support if costs seem wrong
```

---

## 📞 **PART 6: Support and Escalation**

### **When to Use Each Method**

**Use Google Sheets for:**
- Regular player data updates
- Injury status changes
- Performance statistics
- New player additions

**Use Direct Database for:**
- Emergency fixes only
- When Google Sheets sync is broken
- Critical pre-match updates

**Use Neon Console for:**
- Monitoring costs and usage
- Creating backups
- Viewing raw data for verification

### **Emergency Contacts**
```
Database Issues: [Your IT Support Contact]
Google Sheets Problems: [Google Workspace Admin]
App Functionality: [Developer/Support Team]
```

### **Monthly Checklist**
- [ ] Review database costs
- [ ] Create data backup
- [ ] Update Google Sheets templates
- [ ] Check player data accuracy
- [ ] Verify sync functionality

---

This guide provides everything North Harbour Rugby staff need to manage their data effectively without technical expertise. The Google Sheets integration makes daily operations simple, while the database tools provide backup options for emergency situations.