# 🏉 Complete Google Cloud Setup for North Harbour Rugby Dashboard

## Overview

This guide sets up a dedicated Google Cloud project that consolidates:
- **Database Management** (Cloud SQL PostgreSQL)
- **AI Analytics** (Gemini API)
- **Cost Management** (Unified billing)
- **Data Integration** (Google Sheets sync)
- **Project Control** (Single dashboard for all operations)

---

## 📋 **PART 1: Google Cloud Project Creation**

### **Step 1: Create New Project**
```
1. Go to: https://console.cloud.google.com
2. Sign in with your TradieAI Google account
3. Click project dropdown (top left)
4. Click "New Project"
5. Project name: "north-harbour-rugby-dashboard"
6. Project ID: "north-harbour-rugby-dashboard" (or auto-generated)
7. Organization: TradieAI (if applicable)
8. Click "Create"
```

### **Step 2: Enable Required APIs**
```
1. Go to: APIs & Services → Library
2. Search and enable these APIs:
   ✓ Cloud SQL Admin API
   ✓ Generative AI API (for Gemini)
   ✓ Google Sheets API
   ✓ Cloud Resource Manager API
   ✓ Cloud Billing API
   ✓ IAM Service Account Credentials API
```

### **Step 3: Set Up Billing**
```
1. Go to: Billing
2. Link to your TradieAI billing account
3. Set up budget alerts:
   - Budget name: "North Harbour Rugby Monthly"
   - Amount: $100/month (adjust as needed)
   - Alerts at: 50%, 90%, 100%
   - Email: your TradieAI email
```

---

## 🗄️ **PART 2: Cloud SQL Database Setup**

### **Step 4: Create PostgreSQL Instance**
```
1. Go to: SQL → Create Instance
2. Choose: PostgreSQL
3. Configuration:
   - Instance ID: "north-harbour-rugby-db"
   - Password: [Create secure password - save this!]
   - Database version: PostgreSQL 15
   - Region: australia-southeast1 (closest to NZ)
   - Zone: Single zone (cost-effective)
   
4. Machine Configuration:
   - Machine type: db-f1-micro (1 vCPU, 0.6 GB RAM)
   - Storage: 10 GB SSD
   - Auto-increase: Enabled
   
5. Connections:
   - Public IP: Enabled
   - Authorized networks: 0.0.0.0/0 (temporary - secure later)
   - SSL: Required
   
6. Backup:
   - Automated backups: Enabled
   - Backup window: 03:00 (NZ time)
   - Point-in-time recovery: Enabled
   
7. Click "Create Instance"
```

### **Step 5: Create Database and User**
```
1. Wait for instance creation (5-10 minutes)
2. Click on your instance name
3. Go to "Databases" tab:
   - Click "Create Database"
   - Name: "rugby_performance"
   - Click "Create"
   
4. Go to "Users" tab:
   - Click "Add User Account"
   - Username: "rugby_admin"
   - Password: [Create secure password - save this!]
   - Click "Add"
```

### **Step 6: Get Connection Details**
```
Copy these details for later use:
- Public IP: [Found in instance overview]
- Database name: rugby_performance
- Username: rugby_admin
- Password: [Your password]
- Port: 5432

Connection string format:
postgresql://rugby_admin:PASSWORD@PUBLIC_IP:5432/rugby_performance
```

---

## 🔄 **PART 3: Data Migration from Current Setup**

### **Step 7: Export Current Database Schema**
```
In your current Replit project:
1. Run: npx drizzle-kit generate
2. This creates migration files in drizzle/ folder
3. Copy the schema.ts file content
4. Note all existing table structures
```

### **Step 8: Import Schema to Google Cloud SQL**
```
1. In Google Cloud Console → SQL → your instance
2. Go to "Import" tab
3. Or use the Query interface:
   - Click "Query" tab
   - Copy your schema definitions
   - Execute CREATE TABLE statements
```

### **Step 9: Export Current Data**
```
In your Replit project, create export script:

// Create file: scripts/export-data.ts
import { db } from "../server/db";

async function exportData() {
  const players = await db.select().from(players);
  const squads = await db.select().from(squads);
  const matches = await db.select().from(matchTryData);
  
  console.log('Players:', JSON.stringify(players, null, 2));
  console.log('Squads:', JSON.stringify(squads, null, 2));
  console.log('Matches:', JSON.stringify(matches, null, 2));
}

exportData();
```

### **Step 10: Import Data to Google Cloud SQL**
```
1. Run export script and save output to files
2. In Google Cloud SQL Query interface:
   - Use INSERT statements to populate tables
   - Or use Cloud SQL import functionality for CSV files
3. Verify data integrity after import
```

---

## 🤖 **PART 4: Gemini AI Integration Setup**

### **Step 11: Enable Generative AI API**
```
1. Go to: APIs & Services → Library
2. Search: "Generative AI API"
3. Click and Enable
4. Go to: APIs & Services → Credentials
5. Click "Create Credentials" → API Key
6. Name: "Rugby Dashboard Gemini Key"
7. Restrict key to: Generative AI API only
8. Save the API key securely
```

### **Step 12: Update Rugby App Configuration**
```
In your Replit project, update environment variables:

DATABASE_URL=postgresql://rugby_admin:PASSWORD@PUBLIC_IP:5432/rugby_performance
GEMINI_API_KEY=[Your new Google Cloud API key]
GOOGLE_CLIENT_EMAIL=[Service account email]
GOOGLE_PRIVATE_KEY=[Service account private key]
```

### **Step 13: Test Gemini Integration**
```
Create test file: scripts/test-gemini.ts

import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function testGemini() {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: "Analyze this rugby player: John Smith, Prop, 25 tries this season"
  });
  
  console.log('Gemini Response:', response.text);
}

testGemini();
```

---

## 📊 **PART 5: Google Sheets Integration**

### **Step 14: Create Service Account**
```
1. Go to: IAM & Admin → Service Accounts
2. Click "Create Service Account"
3. Name: "rugby-sheets-integration"
4. Description: "Service account for Google Sheets sync"
5. Click "Create and Continue"
6. Roles: 
   - Cloud SQL Client
   - Editor (for Sheets access)
7. Click "Done"
```

### **Step 15: Generate Service Account Key**
```
1. Click on your service account
2. Go to "Keys" tab
3. Click "Add Key" → "Create New Key"
4. Type: JSON
5. Download and save the JSON file securely
6. Extract client_email and private_key for environment variables
```

### **Step 16: Update Rugby App Google Integration**
```
Update environment variables:
GOOGLE_CLIENT_EMAIL=[From service account JSON]
GOOGLE_PRIVATE_KEY=[From service account JSON, with \n for line breaks]
```

---

## 🔒 **PART 6: Security Configuration**

### **Step 17: Secure Database Access**
```
1. Go to: SQL → your instance → Connections
2. Edit "Authorized Networks"
3. Remove 0.0.0.0/0
4. Add specific IPs:
   - Your rugby app's production IP
   - Your office/admin IPs
   - Replit's IP ranges (if still using Replit for hosting)
```

### **Step 18: Set Up IAM Roles**
```
1. Go to: IAM & Admin → IAM
2. Add members with specific roles:
   
   Rugby Admin (you):
   - Project Owner
   
   North Harbour Staff:
   - Cloud SQL Viewer
   - Cloud SQL Editor (for database access)
   
   Coaches:
   - Custom role with limited access
```

---

## 💰 **PART 7: Cost Management and Monitoring**

### **Step 19: Set Up Billing Alerts**
```
1. Go to: Billing → Budgets & Alerts
2. Create budget:
   - Name: "North Harbour Rugby Monthly"
   - Budget amount: $50-100/month
   - Alert thresholds: 50%, 90%, 100%
   - Email notifications to TradieAI account
```

### **Step 20: Enable Cost Tracking**
```
1. Go to: Billing → Cost Table
2. Set up labels for cost tracking:
   - project: north-harbour-rugby
   - environment: production
   - team: rugby-performance
```

---

## 📱 **PART 8: Staff Access and Training**

### **Step 21: Create Staff Access Guide**
```
For North Harbour Rugby staff access:

1. Database Management:
   - URL: https://console.cloud.google.com/sql
   - Project: north-harbour-rugby-dashboard
   - Database: rugby_performance

2. Simple Queries for Staff:
   - View players: SELECT * FROM players;
   - Update status: UPDATE players SET status = 'Injured' WHERE jersey_number = 7;

3. Google Sheets Integration:
   - Use existing Google Sheets
   - Sync via rugby app interface
   - Changes flow to Google Cloud SQL
```

### **Step 22: Monitor and Optimize**
```
Weekly monitoring tasks:
1. Check database performance metrics
2. Review API usage (Gemini calls)
3. Monitor costs and usage patterns
4. Review security logs
5. Test backup and recovery procedures
```

---

## 🚀 **PART 9: Rugby App Integration**

### **Step 23: Update Rugby App Configuration**
```
In your Replit project, update these files:

1. Environment Variables:
   DATABASE_URL=postgresql://rugby_admin:PASSWORD@PUBLIC_IP:5432/rugby_performance
   GEMINI_API_KEY=[Google Cloud API key]
   GOOGLE_CLIENT_EMAIL=[Service account email]
   GOOGLE_PRIVATE_KEY=[Service account private key]

2. Test connection:
   npm run db:push (to sync schema)
   npm start (to test app functionality)
```

### **Step 24: Verify Complete Integration**
```
Test these workflows:
1. Google Sheets → Cloud SQL sync
2. Gemini AI analysis functionality  
3. Database web interface access
4. Cost tracking and billing
5. Backup and recovery procedures
```

---

## 📋 **PART 10: Operational Handover**

### **Step 25: Documentation for North Harbour Rugby**
```
Create operational documentation:
1. Google Cloud Console access guide
2. Database management procedures
3. Cost monitoring instructions
4. Emergency contact procedures
5. Backup and recovery plans
```

### **Step 26: Monitoring Dashboard**
```
Set up monitoring:
1. Database uptime alerts
2. Performance monitoring
3. Cost threshold alerts
4. Security incident notifications
5. Backup verification alerts
```

This complete setup gives North Harbour Rugby a professional, scalable cloud infrastructure managed through your TradieAI Google Cloud account while providing them operational independence for daily database management.

**Expected Monthly Costs:**
- Cloud SQL (db-f1-micro): $7-15
- Gemini API calls: $5-20  
- Storage and networking: $2-5
- **Total: $15-40/month**

The setup provides enterprise-grade infrastructure with simple web-based management for rugby staff.