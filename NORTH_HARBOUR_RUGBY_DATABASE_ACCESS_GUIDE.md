# 🏉 North Harbour Rugby - Independent Database Access Guide

## Overview

Your rugby app now has an **independent external database** that North Harbour Rugby staff can access directly without needing access to the developer's Replit account. This gives you full operational control.

---

## 🔑 **Your Database Connection Details**

**Database Provider:** External PostgreSQL (Neon/Supabase equivalent)
**Access Method:** Direct database connection tools

### **Connection Information**
```
Host: [Available in your environment variables]
Port: [Available in your environment variables]  
Database: [Available in your environment variables]
Username: [Available in your environment variables]
Password: [Available in your environment variables]
```

**Note:** The exact connection details are stored as environment variables in your Replit project for security. You can find them in your project settings.

---

## 📊 **Method 1: DBeaver (Recommended for Staff)**

### **What is DBeaver?**
Free, user-friendly database management tool - like Excel but for databases.

### **Installation**
```
1. Go to: https://dbeaver.io/download/
2. Download "Community Edition" (free)
3. Install on your computer
4. Open DBeaver
```

### **Connecting to Your Database**
```
1. Click "New Database Connection"
2. Select "PostgreSQL" 
3. Enter connection details:
   - Host: [From your environment variables]
   - Port: [From your environment variables]
   - Database: [From your environment variables]
   - Username: [From your environment variables]
   - Password: [From your environment variables]
4. Click "Test Connection"
5. Click "Finish"
```

### **Using DBeaver for Daily Operations**

**Viewing Player Data:**
```
1. Expand your database connection
2. Expand "Schemas" → "public" → "Tables"
3. Double-click "players" table
4. See all player data in spreadsheet format
```

**Editing Player Information:**
```
1. Open players table
2. Find the player you want to edit
3. Double-click any cell to edit
4. Press Enter to save changes
5. Changes appear immediately in rugby app
```

**Common Data Updates:**
- Player status: Change "Fit" to "Injured" or "Suspended"
- Jersey numbers: Update for new season
- Contact details: Phone, email, emergency contacts
- Physical stats: Weight, height measurements
- Performance data: Game statistics, fitness scores

---

## 📊 **Method 2: pgAdmin (Advanced Users)**

### **What is pgAdmin?**
Professional PostgreSQL administration tool with advanced features.

### **Installation**
```
1. Go to: https://www.pgadmin.org/download/
2. Download for your operating system
3. Install and open pgAdmin
```

### **Connecting to Your Database**
```
1. Right-click "Servers" → "Create" → "Server"
2. General Tab:
   - Name: "North Harbour Rugby Database"
3. Connection Tab:
   - Host: [From your environment variables]
   - Port: [From your environment variables]
   - Database: [From your environment variables]
   - Username: [From your environment variables]
   - Password: [From your environment variables]
4. Click "Save"
```

### **Advanced Operations**
- **SQL Queries:** Write custom queries for complex reports
- **Data Export:** Export tables to CSV for external analysis
- **Database Backup:** Create full database backups
- **User Management:** Add/remove database users
- **Performance Monitoring:** Track database performance

---

## 🛠️ **Method 3: Command Line Access (Technical Staff)**

### **Using psql (PostgreSQL Command Line)**
```bash
# Connect to database
psql -h [HOST] -p [PORT] -U [USERNAME] -d [DATABASE]

# View all players
\c rugby_database
SELECT * FROM players;

# Update player status
UPDATE players SET "currentStatus" = 'Injured' WHERE "jerseyNumber" = 7;

# Export data
\copy players TO '/path/to/export.csv' CSV HEADER;
```

---

## 🔄 **Google Sheets Integration**

### **How It Works with External Database**
```
Google Sheets → API Sync → External Database → Rugby App
```

### **Your Google Sheets Sync Process**
1. **Prepare Google Sheet** with correct column format
2. **Get Sheet ID** from the URL
3. **Trigger Sync** via rugby app interface
4. **Data Updates** external database directly
5. **Changes Appear** in rugby app immediately

### **Sync Endpoints Available**
- `POST /api/sheets/sync-all` - Full player roster sync
- `POST /api/sheets/sync-matches` - Match statistics sync
- `GET /api/sheets/preview` - Preview data before sync

---

## 💰 **Cost Management**

### **Monthly Database Costs**
- **Small Club (50 players):** $10-25/month
- **Medium Club (100+ players):** $25-50/month
- **Large Operations (multiple teams):** $50-100/month

### **Cost Monitoring**
The external database provider will send you monthly usage reports and billing statements directly to your email.

### **Optimization Tips**
1. **Regular Cleanup:** Archive old seasons annually
2. **Efficient Queries:** Use indexes for frequently accessed data
3. **Backup Strategy:** Regular backups prevent data loss costs
4. **Monitor Usage:** Track query frequency and storage growth

---

## 🔐 **Security and Access Control**

### **Database User Management**
Create separate database users for different staff roles:

```sql
-- Head Coach (Full Access)
CREATE USER head_coach WITH PASSWORD 'secure_password';
GRANT ALL PRIVILEGES ON ALL TABLES TO head_coach;

-- Medical Staff (Medical Data Only)
CREATE USER medical_staff WITH PASSWORD 'secure_password';
GRANT SELECT, UPDATE ON players TO medical_staff;

-- Analyst (Read-Only)
CREATE USER analyst WITH PASSWORD 'secure_password';
GRANT SELECT ON ALL TABLES TO analyst;
```

### **Best Practices**
1. **Unique Passwords:** Each staff member has own database login
2. **Regular Updates:** Change passwords quarterly
3. **Access Logging:** Monitor who accesses what data
4. **Backup Verification:** Test backup restoration monthly

---

## 📞 **Support and Troubleshooting**

### **Common Issues**

**Problem: Cannot connect to database**
```
Solution:
1. Check internet connection
2. Verify connection details are correct
3. Ensure database server is running
4. Check firewall settings
```

**Problem: Data changes not appearing in app**
```
Solution:
1. Refresh the rugby app page
2. Check if database connection is active
3. Verify changes were saved properly
4. Clear browser cache
```

**Problem: Slow database performance**
```
Solution:
1. Check database server status
2. Review query efficiency
3. Consider database optimization
4. Monitor concurrent users
```

### **Emergency Contacts**
```
Database Technical Issues: [Database Provider Support]
Rugby App Issues: [App Support Contact]
Google Sheets Sync: [Integration Support]
```

---

## 📋 **Daily Operations Checklist**

### **Morning Routine**
- [ ] Check database connection
- [ ] Update player availability
- [ ] Sync latest Google Sheets data
- [ ] Review injury status updates

### **Match Day Routine**
- [ ] Update squad selections
- [ ] Record match statistics
- [ ] Update injury/medical status
- [ ] Generate match reports

### **Weekly Review**
- [ ] Backup database
- [ ] Review performance metrics
- [ ] Check cost usage
- [ ] Update player progress data

---

## 🚀 **Next Steps**

### **Immediate Actions:**
1. **Install DBeaver** on staff computers
2. **Set up database connections** using provided credentials
3. **Train key staff** on basic database operations
4. **Test Google Sheets sync** with sample data

### **Ongoing Management:**
1. **Monthly cost reviews** with database provider
2. **Quarterly security audits** and password updates
3. **Annual database maintenance** and optimization
4. **Staff training updates** as needed

This guide ensures North Harbour Rugby has complete operational independence for their rugby performance database, separate from any developer accounts or dependencies.