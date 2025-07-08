#!/bin/bash

# 🏉 Google Cloud Optimized Setup Script for North Harbour Rugby
# This script sets up cost-optimized Cloud SQL + BigQuery infrastructure

echo "🏉 North Harbour Rugby - Google Cloud Setup"
echo "==========================================="
echo ""

# Check if gcloud CLI is installed
if ! command -v gcloud &> /dev/null; then
    echo "❌ Google Cloud CLI not found. Please install it first:"
    echo "   curl https://sdk.cloud.google.com | bash"
    exit 1
fi

# Configuration variables
PROJECT_ID="north-harbour-rugby-dashboard"
REGION="us-central1"
ZONE="us-central1-a"
INSTANCE_NAME="north-harbour-rugby-db"
DATABASE_NAME="rugby_performance"
DB_USER="rugby_admin"
BIGQUERY_DATASET="north_harbour_analytics"

echo "📋 Configuration:"
echo "   Project ID: $PROJECT_ID"
echo "   Region: $REGION"
echo "   Database Instance: $INSTANCE_NAME"
echo "   Database: $DATABASE_NAME"
echo ""

# Create or select project
echo "🔧 Setting up Google Cloud project..."
gcloud projects create $PROJECT_ID --name="North Harbour Rugby Dashboard" 2>/dev/null || echo "Project already exists"
gcloud config set project $PROJECT_ID

# Enable required APIs
echo "🔌 Enabling required APIs..."
gcloud services enable sqladmin.googleapis.com
gcloud services enable bigquery.googleapis.com
gcloud services enable cloudfunctions.googleapis.com
gcloud services enable cloudscheduler.googleapis.com
gcloud services enable aiplatform.googleapis.com

# Create optimized Cloud SQL instance
echo "🗄️ Creating cost-optimized Cloud SQL instance..."
gcloud sql instances create $INSTANCE_NAME \
    --database-version=POSTGRES_15 \
    --cpu=1 \
    --memory=614MB \
    --storage-size=10GB \
    --storage-type=HDD \
    --region=$REGION \
    --availability-type=ZONAL \
    --backup-start-time=03:00 \
    --no-backup-retention-count \
    --deletion-protection \
    --pricing-plan=PER_USE

# Set database password
echo "🔑 Setting database password..."
read -s -p "Enter password for database user '$DB_USER': " DB_PASSWORD
echo ""

# Create database and user
echo "📊 Creating database and user..."
gcloud sql databases create $DATABASE_NAME --instance=$INSTANCE_NAME

gcloud sql users create $DB_USER \
    --instance=$INSTANCE_NAME \
    --password=$DB_PASSWORD

# Get connection details
echo "🔗 Getting connection details..."
CONNECTION_NAME=$(gcloud sql instances describe $INSTANCE_NAME --format="value(connectionName)")
IP_ADDRESS=$(gcloud sql instances describe $INSTANCE_NAME --format="value(ipAddresses[0].ipAddress)")

echo "📝 Database connection details:"
echo "   Host: $IP_ADDRESS"
echo "   Database: $DATABASE_NAME"
echo "   User: $DB_USER"
echo "   Connection String: postgresql://$DB_USER:$DB_PASSWORD@$IP_ADDRESS:5432/$DATABASE_NAME"
echo ""

# Create BigQuery dataset
echo "📈 Creating BigQuery dataset for analytics..."
bq mk --dataset --location=US $PROJECT_ID:$BIGQUERY_DATASET

# Create BigQuery tables
echo "📊 Creating BigQuery tables..."
bq mk --table $PROJECT_ID:$BIGQUERY_DATASET.player_performance_history \
    player_id:STRING,player_name:STRING,position:STRING,match_date:DATE,performance_score:FLOAT,tries_scored:INTEGER,tackles_made:INTEGER,season:STRING

bq mk --table $PROJECT_ID:$BIGQUERY_DATASET.match_analytics \
    match_id:STRING,match_date:DATE,opponent:STRING,venue:STRING,tries_scored:INTEGER,points_scored:INTEGER,result:STRING

bq mk --table $PROJECT_ID:$BIGQUERY_DATASET.injury_patterns \
    injury_id:STRING,player_id:STRING,injury_type:STRING,injury_date:DATE,recovery_days:INTEGER,position:STRING

# Create service account for rugby app
echo "👤 Creating service account..."
gcloud iam service-accounts create rugby-app-service \
    --display-name="Rugby App Service Account"

# Grant necessary permissions
echo "🔐 Setting up permissions..."
gcloud projects add-iam-policy-binding $PROJECT_ID \
    --member="serviceAccount:rugby-app-service@$PROJECT_ID.iam.gserviceaccount.com" \
    --role="roles/cloudsql.client"

gcloud projects add-iam-policy-binding $PROJECT_ID \
    --member="serviceAccount:rugby-app-service@$PROJECT_ID.iam.gserviceaccount.com" \
    --role="roles/bigquery.dataEditor"

# Create and download service account key
echo "🔑 Creating service account key..."
gcloud iam service-accounts keys create rugby-app-key.json \
    --iam-account=rugby-app-service@$PROJECT_ID.iam.gserviceaccount.com

# Set up budget alerts
echo "💰 Setting up budget alerts..."
gcloud billing budgets create \
    --billing-account=$(gcloud billing accounts list --format="value(name)" --limit=1) \
    --display-name="North Harbour Rugby Monthly Budget" \
    --budget-amount=25 \
    --threshold-percent=50,90,100 \
    --notification-channels=$(gcloud alpha monitoring notification-channels list --format="value(name)" --limit=1) \
    2>/dev/null || echo "Budget creation requires billing account setup"

# Create Cloud Function for data sync (placeholder)
echo "⚙️ Creating data sync function..."
cat > sync-function.js << 'EOF'
const { BigQuery } = require('@google-cloud/bigquery');
const { Client } = require('pg');

exports.syncToBigQuery = async (req, res) => {
    const client = new Client({
        host: process.env.DB_HOST,
        database: process.env.DB_NAME,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        port: 5432,
        ssl: true
    });

    const bigquery = new BigQuery();
    
    try {
        await client.connect();
        
        // Sync players data
        const playersResult = await client.query('SELECT * FROM players');
        const dataset = bigquery.dataset('north_harbour_analytics');
        const table = dataset.table('player_performance_history');
        
        await table.insert(playersResult.rows);
        
        res.status(200).send('Sync completed successfully');
    } catch (error) {
        console.error('Sync error:', error);
        res.status(500).send('Sync failed');
    } finally {
        await client.end();
    }
};
EOF

# Output summary
echo ""
echo "✅ Setup completed successfully!"
echo ""
echo "📋 Summary:"
echo "   - Project: $PROJECT_ID"
echo "   - Cloud SQL instance: $INSTANCE_NAME"
echo "   - BigQuery dataset: $BIGQUERY_DATASET"
echo "   - Service account key: rugby-app-key.json"
echo ""
echo "🔗 Connection String for Rugby App:"
echo "   DATABASE_URL=postgresql://$DB_USER:$DB_PASSWORD@$IP_ADDRESS:5432/$DATABASE_NAME"
echo ""
echo "💰 Expected Monthly Cost: $6-18"
echo ""
echo "📝 Next Steps:"
echo "   1. Update rugby app environment variables"
echo "   2. Run data migration script"
echo "   3. Test rugby app connectivity"
echo "   4. Set up monitoring and alerts"
echo "   5. Train staff on Google Cloud Console"
echo ""
echo "🌐 Management URLs:"
echo "   - Cloud SQL: https://console.cloud.google.com/sql/instances"
echo "   - BigQuery: https://console.cloud.google.com/bigquery"
echo "   - Billing: https://console.cloud.google.com/billing"
echo ""
echo "🏉 Your North Harbour Rugby infrastructure is ready!"