# 🏉 Google Cloud SQL Setup for North Harbour Rugby

## Why Google Cloud SQL is Perfect for Rugby Clubs

**Simple Web Interface** - No software installation needed
**Integrated with Google Sheets** - Same Google account, seamless sync
**Professional Sports Standard** - Used by major sports organizations
**Pay-as-you-use** - Cost-effective for seasonal rugby operations

---

## 🚀 **Step 1: Create Google Cloud SQL Database**

### **Setup Process (One-time)**
```
1. Go to: https://console.cloud.google.com/sql
2. Sign in with your Google account
3. Click "Create Instance"
4. Choose "PostgreSQL"
5. Configure:
   - Instance ID: "north-harbour-rugby-db"
   - Password: [Create secure password]
   - Region: "australia-southeast1" (closest to NZ)
   - Machine type: "db-f1-micro" (cost-effective)
6. Click "Create"
```

### **Database Creation**
```
1. Once instance is created, click on it
2. Go to "Databases" tab
3. Click "Create Database"
4. Name: "rugby_performance"
5. Click "Create"
```

### **User Access Setup**
```
1. Go to "Users" tab
2. Click "Add User Account"
3. Username: "rugby_admin"
4. Password: [Secure password]
5. Grant all privileges
6. Click "Add"
```

---

## 📊 **Step 2: Web-Based Database Management**

### **Accessing Your Database**
```
1. Go to: https://console.cloud.google.com/sql
2. Click on your "north-harbour-rugby-db" instance
3. Click "Connect" → "Open Cloud Shell"
4. Or use the built-in web query interface
```

### **Using Google Cloud Console Interface**

**Viewing Player Data:**
```
1. In Cloud Console, go to SQL → your instance
2. Click "Query" tab
3. Type: SELECT * FROM players;
4. Click "Run"
5. See all players in table format
```

**Updating Player Information:**
```
1. In Query tab, type:
   UPDATE players 
   SET "currentStatus" = 'Injured' 
   WHERE "jerseyNumber" = 7;
2. Click "Run"
3. Changes appear immediately in rugby app
```

### **Common Operations via Web Interface**

**Check Player Availability:**
```sql
SELECT "firstName", "lastName", "position", "currentStatus" 
FROM players 
WHERE "currentStatus" = 'Fit'
ORDER BY "position";
```

**Update Multiple Players:**
```sql
UPDATE players 
SET "currentStatus" = 'Fit' 
WHERE "currentStatus" = 'Injured' 
AND "jerseyNumber" IN (1, 2, 3, 4, 5);
```

**Export Data for Reports:**
```sql
SELECT * FROM players 
WHERE "position" = 'Forward'
ORDER BY "jerseyNumber";
```

---

## 🔄 **Step 3: Google Sheets Integration**

### **Perfect Integration Workflow**
```
Google Sheets → Cloud Function → Google Cloud SQL → Rugby App
```

### **Same Google Account Benefits**
- **No authentication issues** - Same Google login
- **Automatic permissions** - Sheets can access database
- **Unified billing** - One Google Cloud account
- **Seamless sync** - Direct Google-to-Google integration

### **Enhanced Sync Process**
```
1. Update Google Sheets (rugby roster)
2. Trigger sync via rugby app
3. Data flows directly to Google Cloud SQL
4. Rugby app displays updated information
5. All managed through Google Cloud Console
```

---

## 💰 **Step 4: Cost Management**

### **Google Cloud SQL Pricing**
```
Small Rugby Club Setup:
- db-f1-micro instance: $7-15/month
- Storage (10GB): $1-2/month
- Network egress: $0-5/month
Total: ~$10-25/month
```

### **Cost Monitoring**
```
1. Go to: https://console.cloud.google.com/billing
2. View real-time costs
3. Set up budget alerts
4. Monitor usage patterns
```

### **Cost Optimization Tips**
- **Automatic backup** - 7-day retention (included)
- **Stop instance** - During off-season (save 100%)
- **Scale down** - Reduce machine type when not needed
- **Regional storage** - Use closest region to minimize costs

---

## 🛠️ **Step 5: Rugby App Integration**

### **Updating Connection String**
```javascript
// In your rugby app environment variables:
DATABASE_URL = "postgresql://rugby_admin:password@YOUR_INSTANCE_IP:5432/rugby_performance"
```

### **Google Cloud Connection Details**
```
1. Go to Cloud SQL instance overview
2. Note "Public IP address"
3. Update rugby app DATABASE_URL
4. Test connection
```

### **Network Security**
```
1. Go to "Connections" tab
2. Add "Authorized networks"
3. Add your rugby app's IP address
4. Enable secure connections
```

---

## 📱 **Step 6: Staff Training (Simple)**

### **For Rugby Staff - No Technical Skills Needed**

**Daily Operations:**
```
1. Go to: https://console.cloud.google.com/sql
2. Click your database instance
3. Click "Query" tab
4. Use pre-written queries (provided below)
5. Click "Run" to execute
```

**Pre-Written Queries for Staff:**

**View All Available Players:**
```sql
SELECT "firstName", "lastName", "position", "jerseyNumber"
FROM players 
WHERE "currentStatus" = 'Fit'
ORDER BY "position", "jerseyNumber";
```

**Update Player Status:**
```sql
-- Change player 7 to injured
UPDATE players 
SET "currentStatus" = 'Injured' 
WHERE "jerseyNumber" = 7;
```

**Get Squad for Match:**
```sql
SELECT "firstName", "lastName", "position"
FROM players 
WHERE "currentStatus" = 'Fit' 
AND "position" IN ('Prop', 'Hooker', 'Lock', 'Flanker', 'Number 8')
ORDER BY "position";
```

---

## 🔐 **Step 7: Security and Backup**

### **Automated Backups**
```
Google Cloud SQL automatically:
- Creates daily backups
- Retains for 7 days
- Allows point-in-time recovery
- Stores in secure Google infrastructure
```

### **User Management**
```
1. Create role-based users:
   - rugby_admin (full access)
   - rugby_medical (medical data only)
   - rugby_analyst (read-only)
2. Use Google Cloud IAM for advanced permissions
```

### **Security Best Practices**
- **SSL connections** - Always encrypted
- **IP whitelisting** - Only authorized access
- **Regular password updates** - Quarterly changes
- **Audit logging** - Track all database changes

---

## 📊 **Step 8: Monitoring and Alerts**

### **Database Performance Monitoring**
```
1. Go to Cloud SQL instance
2. Click "Monitoring" tab
3. View:
   - CPU usage
   - Memory usage
   - Connection count
   - Query performance
```

### **Setting Up Alerts**
```
1. Go to "Monitoring" → "Alerting"
2. Create alert policies:
   - High CPU usage (>80%)
   - Storage nearly full (>90%)
   - Connection failures
   - Unusual query patterns
```

---

## 🚀 **Migration from Current Setup**

### **Data Migration Process**
```
1. Export current data from rugby app
2. Import to Google Cloud SQL
3. Update rugby app connection string
4. Test all functionality
5. Train staff on new interface
```

### **Zero-Downtime Migration**
```
1. Set up Google Cloud SQL parallel to current setup
2. Sync data continuously
3. Switch rugby app to new database
4. Verify all systems working
5. Decommission old database
```

This Google Cloud SQL setup gives North Harbour Rugby a professional, web-based database management system that integrates perfectly with their existing Google Sheets workflow and requires no software installation.