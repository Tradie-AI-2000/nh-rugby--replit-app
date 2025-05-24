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

// Advanced metrics schema
export const advancedMetricsSchema = z.object({
  id: z.string(),
  playerId: z.string(),
  date: z.string(),
  matchId: z.string().optional(),
  metrics: z.object({
    // Physical metrics
    distanceCovered: z.number(),
    topSpeed: z.number(),
    sprintCount: z.number(),
    averageHeartRate: z.number(),
    maxHeartRate: z.number(),
    caloriesBurned: z.number(),
    // Rugby specific metrics
    rucks: z.number(),
    mauls: z.number(),
    scrums: z.number(),
    lineouts: z.number(),
    possessionTime: z.number(),
    territoryGained: z.number(),
    // Performance ratings
    workRate: z.number(),
    discipline: z.number(),
    communication: z.number(),
    leadership: z.number(),
  }),
  heatMap: z.array(z.object({
    x: z.number(),
    y: z.number(),
    intensity: z.number(),
  })),
  recordedBy: z.string(),
  device: z.string().optional(),
});

// Training program schema
export const trainingProgramSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  duration: z.number(), // weeks
  phase: z.enum(['preseason', 'inseason', 'offseason', 'recovery']),
  focusAreas: z.array(z.enum(['strength', 'endurance', 'speed', 'agility', 'skills', 'recovery'])),
  sessions: z.array(z.object({
    id: z.string(),
    day: z.number(),
    week: z.number(),
    type: z.enum(['strength', 'conditioning', 'skills', 'tactical', 'recovery']),
    duration: z.number(), // minutes
    intensity: z.enum(['low', 'medium', 'high', 'max']),
    exercises: z.array(z.object({
      name: z.string(),
      sets: z.number().optional(),
      reps: z.number().optional(),
      duration: z.number().optional(),
      weight: z.number().optional(),
      notes: z.string().optional(),
    })),
    notes: z.string().optional(),
  })),
  assignedPlayers: z.array(z.string()),
  createdBy: z.string(),
  createdAt: z.string(),
});

// Injury tracking schema
export const injuryTrackingSchema = z.object({
  id: z.string(),
  playerId: z.string(),
  type: z.enum(['acute', 'chronic', 'overuse']),
  severity: z.enum(['minor', 'moderate', 'severe', 'critical']),
  bodyPart: z.string(),
  specificArea: z.string(),
  mechanism: z.string(),
  dateOccurred: z.string(),
  dateReported: z.string(),
  expectedReturn: z.string().optional(),
  actualReturn: z.string().optional(),
  status: z.enum(['active', 'recovering', 'resolved', 'chronic']),
  treatmentPlan: z.array(z.object({
    date: z.string(),
    treatment: z.string(),
    provider: z.string(),
    notes: z.string(),
    progress: z.enum(['excellent', 'good', 'fair', 'poor']),
  })),
  restrictions: z.array(z.string()),
  riskFactors: z.array(z.string()),
  preventionNotes: z.string().optional(),
  medicalStaff: z.string(),
  lastUpdated: z.string(),
});

// Team communication schema
export const communicationSchema = z.object({
  id: z.string(),
  type: z.enum(['announcement', 'message', 'alert', 'reminder']),
  title: z.string(),
  content: z.string(),
  priority: z.enum(['low', 'medium', 'high', 'urgent']),
  recipients: z.array(z.string()), // player IDs or 'all'
  sender: z.string(),
  attachments: z.array(z.object({
    name: z.string(),
    url: z.string(),
    type: z.string(),
  })).optional(),
  readBy: z.array(z.object({
    playerId: z.string(),
    readAt: z.string(),
  })),
  createdAt: z.string(),
  scheduledFor: z.string().optional(),
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
export type VideoAnalysis = z.infer<typeof videoAnalysisSchema>;
export type Benchmark = z.infer<typeof benchmarkSchema>;
export type AdvancedMetrics = z.infer<typeof advancedMetricsSchema>;
export type TrainingProgram = z.infer<typeof trainingProgramSchema>;
export type InjuryTracking = z.infer<typeof injuryTrackingSchema>;
export type Communication = z.infer<typeof communicationSchema>;

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
  videoAnalysis: jsonb("video_analysis").default('[]').$type<Array<{
    id: string;
    title: string;
    description: string;
    videoUrl: string;
    thumbnailUrl?: string;
    duration: number;
    matchDate: string;
    opponent?: string;
    analysisType: string;
    tags: string[];
    keyMoments: Array<{
      timestamp: number;
      title: string;
      description: string;
      category: string;
    }>;
    metrics?: {
      tackles?: number;
      carries?: number;
      metersGained?: number;
      turnovers?: number;
      passesCompleted?: number;
      lineoutSuccess?: number;
    };
    coachNotes?: string;
    isHighlight: boolean;
    uploadedBy: string;
    uploadedAt: string;
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
