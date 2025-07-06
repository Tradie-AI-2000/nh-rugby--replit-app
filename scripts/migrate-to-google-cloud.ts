#!/usr/bin/env tsx

/**
 * Data Migration Script: Replit PostgreSQL → Google Cloud SQL
 * 
 * This script exports all data from your current Replit database
 * and prepares it for import into Google Cloud SQL
 */

import { db } from "../server/db";
import * as schema from "../shared/schema";
import { writeFileSync } from "fs";
import { format } from "date-fns";

interface MigrationData {
  players: any[];
  squads: any[];
  matchTryData: any[];
  sessions: any[];
  users: any[];
  exportDate: string;
  totalRecords: number;
}

async function exportCurrentData(): Promise<MigrationData> {
  console.log("🏉 Starting North Harbour Rugby data export...");
  
  try {
    // Export all main tables
    console.log("📊 Exporting players...");
    const players = await db.select().from(schema.players).catch(() => []);
    
    console.log("🏈 Exporting squads...");
    const squads = await db.select().from(schema.squads).catch(() => []);
    
    console.log("🎯 Exporting match try data...");
    const matchTryData = await db.select().from(schema.matchTryData).catch(() => []);
    
    console.log("📅 Exporting sessions...");
    const sessions = await db.select().from(schema.sessions).catch(() => []);
    
    console.log("👥 Exporting users...");
    const users = await db.select().from(schema.users).catch(() => []);
    
    const migrationData: MigrationData = {
      players,
      squads,
      matchTryData,
      sessions,
      users,
      exportDate: format(new Date(), "yyyy-MM-dd HH:mm:ss"),
      totalRecords: players.length + squads.length + matchTryData.length + sessions.length + users.length
    };
    
    console.log(`✅ Export completed successfully!`);
    console.log(`📈 Total records exported: ${migrationData.totalRecords}`);
    console.log(`   - Players: ${players.length}`);
    console.log(`   - Squads: ${squads.length}`);
    console.log(`   - Match Try Data: ${matchTryData.length}`);
    console.log(`   - Sessions: ${sessions.length}`);
    console.log(`   - Users: ${users.length}`);
    
    return migrationData;
    
  } catch (error) {
    console.error("❌ Export failed:", error);
    throw error;
  }
}

async function generateSQLImportScript(data: MigrationData): Promise<string> {
  console.log("🔄 Generating SQL import script...");
  
  let sql = `-- North Harbour Rugby Database Migration
-- Generated: ${data.exportDate}
-- Total Records: ${data.totalRecords}

-- Disable triggers during import for better performance
SET session_replication_role = replica;

`;

  // Helper function to escape SQL values
  const escapeValue = (value: any): string => {
    if (value === null || value === undefined) return 'NULL';
    if (typeof value === 'string') return `'${value.replace(/'/g, "''")}'`;
    if (typeof value === 'boolean') return value ? 'TRUE' : 'FALSE';
    if (value instanceof Date) return `'${value.toISOString()}'`;
    if (typeof value === 'object') return `'${JSON.stringify(value).replace(/'/g, "''")}'`;
    return String(value);
  };

  // Generate INSERT statements for users
  if (data.users.length > 0) {
    sql += `-- Import Users\n`;
    for (const user of data.users) {
      const values = [
        escapeValue(user.id),
        escapeValue(user.email),
        escapeValue(user.firstName),
        escapeValue(user.lastName),
        escapeValue(user.profileImageUrl),
        escapeValue(user.createdAt),
        escapeValue(user.updatedAt)
      ].join(', ');
      
      sql += `INSERT INTO users (id, email, "firstName", "lastName", "profileImageUrl", "createdAt", "updatedAt") VALUES (${values}) ON CONFLICT (id) DO UPDATE SET email = EXCLUDED.email;\n`;
    }
    sql += '\n';
  }

  // Generate INSERT statements for players
  if (data.players.length > 0) {
    sql += `-- Import Players\n`;
    for (const player of data.players) {
      const values = [
        escapeValue(player.id),
        escapeValue(player.personalDetails),
        escapeValue(player.physicalAttributes),
        escapeValue(player.gameStats),
        escapeValue(player.skills),
        escapeValue(player.currentStatus),
        escapeValue(player.emergencyContact),
        escapeValue(player.communicationPreferences),
        escapeValue(player.availability),
        escapeValue(player.currentInjuries),
        escapeValue(player.medicalHistory),
        escapeValue(player.trainingHistory),
        escapeValue(player.testResults),
        escapeValue(player.goalSetting),
        escapeValue(player.coachingNotes),
        escapeValue(player.createdAt),
        escapeValue(player.updatedAt)
      ].join(', ');
      
      sql += `INSERT INTO players (id, "personalDetails", "physicalAttributes", "gameStats", skills, "currentStatus", "emergencyContact", "communicationPreferences", availability, "currentInjuries", "medicalHistory", "trainingHistory", "testResults", "goalSetting", "coachingNotes", "createdAt", "updatedAt") VALUES (${values}) ON CONFLICT (id) DO UPDATE SET "updatedAt" = EXCLUDED."updatedAt";\n`;
    }
    sql += '\n';
  }

  // Generate INSERT statements for squads
  if (data.squads.length > 0) {
    sql += `-- Import Squads\n`;
    for (const squad of data.squads) {
      const values = [
        escapeValue(squad.id),
        escapeValue(squad.name),
        escapeValue(squad.matchDate),
        escapeValue(squad.opponent),
        escapeValue(squad.venue),
        escapeValue(squad.startingXV),
        escapeValue(squad.bench),
        escapeValue(squad.unavailablePlayers),
        escapeValue(squad.notes),
        escapeValue(squad.createdAt),
        escapeValue(squad.updatedAt)
      ].join(', ');
      
      sql += `INSERT INTO squads (id, name, "matchDate", opponent, venue, "startingXV", bench, "unavailablePlayers", notes, "createdAt", "updatedAt") VALUES (${values}) ON CONFLICT (id) DO UPDATE SET "updatedAt" = EXCLUDED."updatedAt";\n`;
    }
    sql += '\n';
  }

  // Generate INSERT statements for match try data
  if (data.matchTryData.length > 0) {
    sql += `-- Import Match Try Data\n`;
    for (const tryData of data.matchTryData) {
      const values = [
        escapeValue(tryData.id),
        escapeValue(tryData.section),
        escapeValue(tryData.matchDate),
        escapeValue(tryData.opponent),
        escapeValue(tryData.tryData),
        escapeValue(tryData.analysis),
        escapeValue(tryData.createdAt),
        escapeValue(tryData.updatedAt)
      ].join(', ');
      
      sql += `INSERT INTO "matchTryData" (id, section, "matchDate", opponent, "tryData", analysis, "createdAt", "updatedAt") VALUES (${values}) ON CONFLICT (id) DO UPDATE SET "updatedAt" = EXCLUDED."updatedAt";\n`;
    }
    sql += '\n';
  }

  // Generate INSERT statements for sessions
  if (data.sessions.length > 0) {
    sql += `-- Import Sessions\n`;
    for (const session of data.sessions) {
      const values = [
        escapeValue(session.sid),
        escapeValue(session.sess),
        escapeValue(session.expire)
      ].join(', ');
      
      sql += `INSERT INTO sessions (sid, sess, expire) VALUES (${values}) ON CONFLICT (sid) DO UPDATE SET sess = EXCLUDED.sess, expire = EXCLUDED.expire;\n`;
    }
    sql += '\n';
  }

  sql += `-- Re-enable triggers
SET session_replication_role = DEFAULT;

-- Update sequences to prevent ID conflicts
SELECT setval('players_id_seq', (SELECT COALESCE(MAX(id), 1) FROM players));
SELECT setval('squads_id_seq', (SELECT COALESCE(MAX(id), 1) FROM squads));
SELECT setval('"matchTryData_id_seq"', (SELECT COALESCE(MAX(id), 1) FROM "matchTryData"));

-- Verify import
SELECT 'Players' as table_name, COUNT(*) as record_count FROM players
UNION ALL
SELECT 'Squads', COUNT(*) FROM squads  
UNION ALL
SELECT 'Match Try Data', COUNT(*) FROM "matchTryData"
UNION ALL
SELECT 'Sessions', COUNT(*) FROM sessions
UNION ALL
SELECT 'Users', COUNT(*) FROM users;
`;

  return sql;
}

async function generateCSVExports(data: MigrationData): Promise<void> {
  console.log("📄 Generating CSV exports...");
  
  // Helper function to convert objects to CSV
  const objectToCSV = (objects: any[]): string => {
    if (objects.length === 0) return '';
    
    const headers = Object.keys(objects[0]);
    const csvHeader = headers.join(',');
    
    const csvRows = objects.map(obj => 
      headers.map(header => {
        const value = obj[header];
        if (value === null || value === undefined) return '';
        if (typeof value === 'object') return `"${JSON.stringify(value).replace(/"/g, '""')}"`;
        if (typeof value === 'string' && value.includes(',')) return `"${value.replace(/"/g, '""')}"`;
        return String(value);
      }).join(',')
    );
    
    return [csvHeader, ...csvRows].join('\n');
  };

  // Export each table as CSV
  if (data.players.length > 0) {
    writeFileSync('migration-data/players.csv', objectToCSV(data.players));
    console.log(`   ✅ Players CSV: ${data.players.length} records`);
  }

  if (data.squads.length > 0) {
    writeFileSync('migration-data/squads.csv', objectToCSV(data.squads));
    console.log(`   ✅ Squads CSV: ${data.squads.length} records`);
  }

  if (data.matchTryData.length > 0) {
    writeFileSync('migration-data/match_try_data.csv', objectToCSV(data.matchTryData));
    console.log(`   ✅ Match Try Data CSV: ${data.matchTryData.length} records`);
  }
}

async function main() {
  try {
    console.log("🚀 North Harbour Rugby Database Migration Tool");
    console.log("================================================");
    console.log("");

    // Create migration directory
    const fs = require('fs');
    if (!fs.existsSync('migration-data')) {
      fs.mkdirSync('migration-data');
    }

    // Export current data
    const migrationData = await exportCurrentData();
    
    // Save raw JSON export
    console.log("💾 Saving JSON export...");
    writeFileSync('migration-data/complete-export.json', JSON.stringify(migrationData, null, 2));
    
    // Generate SQL import script
    const sqlScript = await generateSQLImportScript(migrationData);
    writeFileSync('migration-data/import-to-google-cloud.sql', sqlScript);
    console.log("✅ SQL import script generated: migration-data/import-to-google-cloud.sql");
    
    // Generate CSV exports
    await generateCSVExports(migrationData);
    
    console.log("");
    console.log("🎉 Migration preparation completed!");
    console.log("");
    console.log("📁 Files created in migration-data/:");
    console.log("   - complete-export.json (Full data backup)");
    console.log("   - import-to-google-cloud.sql (SQL import script)");
    console.log("   - players.csv (Player data for manual import)");
    console.log("   - squads.csv (Squad data for manual import)");
    console.log("   - match_try_data.csv (Match analysis data)");
    console.log("");
    console.log("📋 Next Steps:");
    console.log("1. Set up Google Cloud SQL instance following the guide");
    console.log("2. Run the SQL script in Google Cloud SQL Query interface");
    console.log("3. Verify data import with the verification queries at the end");
    console.log("4. Update your rugby app's DATABASE_URL to point to Google Cloud SQL");
    console.log("5. Test all functionality with the new database");
    
  } catch (error) {
    console.error("❌ Migration failed:", error);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  main();
}

export { exportCurrentData, generateSQLImportScript, generateCSVExports };