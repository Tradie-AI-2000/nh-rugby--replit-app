import { z } from "zod";
import { pgTable, text, serial, integer, real, timestamp, jsonb } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";

// Physical attribute entry schema
export const physicalAttributeSchema = z.object({
  date: z.string(),
  weight: z.number(),
  bodyFat: z.number(),
  leanMass: z.number(),
  height: z.number().optional(),
});

// Physical test result schema
export const testResultSchema = z.object({
  date: z.string(),
  testType: z.enum(['bench_press', 'squat', 'sprint_40m', 'yo_yo', 'bronco', 'vo2_max']),
  value: z.number(),
  unit: z.string(),
});

// Injury record schema
export const injurySchema = z.object({
  id: z.string(),
  date: z.string(),
  type: z.string(),
  severity: z.enum(['minor', 'moderate', 'major']),
  description: z.string(),
  recoveryDate: z.string().optional(),
  status: z.enum(['active', 'recovering', 'cleared']),
});

// Game statistics schema
export const gameStatsSchema = z.object({
  season: z.string(),
  matchesPlayed: z.number(),
  minutesPlayed: z.number(),
  tries: z.number(),
  tackles: z.number(),
  lineoutWins: z.number(),
  turnovers: z.number(),
  penalties: z.number(),
});

// Skills rating schema
export const skillsSchema = z.object({
  ballHandling: z.number().min(1).max(10),
  passing: z.number().min(1).max(10),
  kicking: z.number().min(1).max(10),
  lineoutThrowing: z.number().min(1).max(10),
  scrummaging: z.number().min(1).max(10),
  rucking: z.number().min(1).max(10),
  defense: z.number().min(1).max(10),
  communication: z.number().min(1).max(10),
});

// Report schema
export const reportSchema = z.object({
  id: z.string(),
  type: z.enum(['coach', 'medical', 'strength_conditioning', 'recruitment']),
  title: z.string(),
  content: z.string(),
  author: z.string(),
  date: z.string(),
  lastUpdated: z.string(),
});

// Activity log schema
export const activitySchema = z.object({
  id: z.string(),
  date: z.string(),
  type: z.enum(['training', 'match', 'test', 'medical', 'meeting']),
  description: z.string(),
  details: z.string().optional(),
});

// Video analysis schema
export const videoAnalysisSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  videoUrl: z.string(),
  thumbnailUrl: z.string().optional(),
  duration: z.number(), // in seconds
  matchDate: z.string(),
  opponent: z.string().optional(),
  analysisType: z.enum(['highlight', 'full_match', 'training', 'skill_focus', 'tactical_analysis']),
  tags: z.array(z.string()),
  keyMoments: z.array(z.object({
    timestamp: z.number(), // seconds from start
    title: z.string(),
    description: z.string(),
    category: z.enum(['try', 'tackle', 'lineout', 'scrum', 'turnover', 'kick', 'skill', 'error']),
  })),
  metrics: z.object({
    tackles: z.number().optional(),
    carries: z.number().optional(),
    metersGained: z.number().optional(),
    turnovers: z.number().optional(),
    passesCompleted: z.number().optional(),
    lineoutSuccess: z.number().optional(),
  }).optional(),
  coachNotes: z.string().optional(),
  isHighlight: z.boolean().default(false),
  uploadedBy: z.string(),
  uploadedAt: z.string(),
});

// Main player schema
export const playerSchema = z.object({
  id: z.string(),
  personalDetails: z.object({
    firstName: z.string(),
    lastName: z.string(),
    dateOfBirth: z.string(),
    email: z.string().email(),
    phone: z.string(),
    address: z.string(),
    emergencyContact: z.object({
      name: z.string(),
      relationship: z.string(),
      phone: z.string(),
    }),
  }),
  rugbyProfile: z.object({
    jerseyNumber: z.number(),
    primaryPosition: z.string(),
    secondaryPositions: z.array(z.string()),
    playingLevel: z.string(),
    yearsInTeam: z.number(),
    previousClubs: z.array(z.string()),
  }),
  physicalAttributes: z.array(physicalAttributeSchema),
  testResults: z.array(testResultSchema),
  skills: skillsSchema,
  gameStats: z.array(gameStatsSchema),
  injuries: z.array(injurySchema),
  reports: z.array(reportSchema),
  activities: z.array(activitySchema),
  videoAnalysis: z.array(videoAnalysisSchema),
  status: z.object({
    fitness: z.enum(['available', 'injured', 'recovering', 'unavailable']),
    medical: z.enum(['cleared', 'under_review', 'restricted']),
  }),
  aiRating: z.object({
    overall: z.number(),
    physicality: z.number(),
    skillset: z.number(),
    gameImpact: z.number(),
    potential: z.number(),
    lastUpdated: z.string(),
  }).optional(),
});

// Positional benchmarks schema
export const benchmarkSchema = z.object({
  position: z.string(),
  benchmarks: z.object({
    bench_press: z.number(),
    squat: z.number(),
    sprint_40m: z.number(),
    yo_yo: z.number(),
    vo2_max: z.number(),
  }),
});

export type PlayerZodType = z.infer<typeof playerSchema>;
export type PhysicalAttribute = z.infer<typeof physicalAttributeSchema>;
export type TestResult = z.infer<typeof testResultSchema>;
export type Injury = z.infer<typeof injurySchema>;
export type GameStats = z.infer<typeof gameStatsSchema>;
export type Skills = z.infer<typeof skillsSchema>;
export type Report = z.infer<typeof reportSchema>;
export type Activity = z.infer<typeof activitySchema>;
export type Benchmark = z.infer<typeof benchmarkSchema>;

// Database Tables
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  email: text("email").notNull().unique(),
  hashedPassword: text("hashed_password").notNull(),
  role: text("role").notNull().default("coach"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const players = pgTable("players", {
  id: text("id").primaryKey(),
  personalDetails: jsonb("personal_details").notNull().$type<{
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    email: string;
    phone: string;
    address: string;
    emergencyContact: {
      name: string;
      relationship: string;
      phone: string;
    };
  }>(),
  rugbyProfile: jsonb("rugby_profile").notNull().$type<{
    jerseyNumber: number;
    primaryPosition: string;
    secondaryPositions: string[];
    playingLevel: string;
    yearsInTeam: number;
    previousClubs: string[];
  }>(),
  physicalAttributes: jsonb("physical_attributes").notNull().$type<Array<{
    date: string;
    weight: number;
    bodyFat: number;
    leanMass: number;
    height?: number;
  }>>(),
  testResults: jsonb("test_results").notNull().$type<Array<{
    date: string;
    testType: string;
    value: number;
    unit: string;
  }>>(),
  skills: jsonb("skills").notNull().$type<{
    ballHandling: number;
    passing: number;
    kicking: number;
    lineoutThrowing: number;
    scrummaging: number;
    rucking: number;
    defense: number;
    communication: number;
  }>(),
  gameStats: jsonb("game_stats").notNull().$type<Array<{
    season: string;
    matchesPlayed: number;
    minutesPlayed: number;
    tries: number;
    tackles: number;
    lineoutWins: number;
    turnovers: number;
    penalties: number;
  }>>(),
  injuries: jsonb("injuries").notNull().$type<Array<{
    id: string;
    date: string;
    type: string;
    severity: string;
    description: string;
    recoveryDate?: string;
    status: string;
  }>>(),
  reports: jsonb("reports").notNull().$type<Array<{
    id: string;
    type: string;
    title: string;
    content: string;
    author: string;
    date: string;
    lastUpdated: string;
  }>>(),
  activities: jsonb("activities").notNull().$type<Array<{
    id: string;
    date: string;
    type: string;
    description: string;
    details?: string;
  }>>(),
  status: jsonb("status").notNull().$type<{
    fitness: string;
    medical: string;
  }>(),
  aiRating: jsonb("ai_rating").$type<{
    overall: number;
    physicality: number;
    skillset: number;
    gameImpact: number;
    potential: number;
    lastUpdated: string;
  }>(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Relations
export const usersRelations = relations(users, ({ many }) => ({
  // Future: user-player assignments, reports, etc.
}));

export const playersRelations = relations(players, ({ one }) => ({
  // Future: relationships with other tables
}));

// Database types
export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;
export type Player = typeof players.$inferSelect;
export type InsertPlayer = typeof players.$inferInsert;

// Insert schemas
export const insertUserSchema = createInsertSchema(users);
export const insertPlayerSchema = createInsertSchema(players);

// Legacy Zod schemas for backwards compatibility  
export type PlayerZod = z.infer<typeof playerSchema>;
export type InsertPlayerZod = z.infer<typeof insertPlayerSchema>;

// Re-export for components that expect the original Player type
export type { Player as PlayerDB } from "./schema";
export { PlayerZodType as Player };
