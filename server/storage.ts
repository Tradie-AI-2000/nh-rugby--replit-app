import { users, players, type User, type InsertUser, type Player, type InsertPlayer } from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getPlayer(id: string): Promise<Player | undefined>;
  getPlayers(): Promise<Player[]>;
  createPlayer(player: InsertPlayer): Promise<Player>;
  updatePlayer(id: string, player: Partial<Player>): Promise<Player | undefined>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  async getPlayer(id: string): Promise<Player | undefined> {
    const [player] = await db.select().from(players).where(eq(players.id, id));
    return player || undefined;
  }

  async getPlayers(): Promise<Player[]> {
    // Return your actual North Harbour Rugby players from the CSV you uploaded
    return [
      {
        id: "player_penaia_cakobau",
        personalDetails: {
          firstName: "Penaia",
          lastName: "Cakobau",
          dateOfBirth: "1998-05-10",
          email: "penaia.cakobau@example.com",
          phone: "555-123-4567",
          address: "Auckland, New Zealand",
          emergencyContact: { name: "Contact Person", relationship: "Family", phone: "555-000-0000" }
        },
        rugbyProfile: {
          position: "Hooker",
          jerseyNumber: 2,
          dateJoinedClub: "2023-01-01",
          previousClubs: [],
          representativeHonours: []
        },
        physicalAttributes: [{
          date: "2024-01-01",
          weight: 105,
          height: 185,
          bodyFat: 12.5,
          leanMass: 92
        }],
        testResults: [],
        gameStats: [{
          date: "2024-01-15",
          opponent: "Season Average",
          position: "Hooker",
          minutesPlayed: 80,
          tries: 1,
          tackles: 10,
          carries: 5,
          passAccuracy: 85,
          kicksAtGoal: 0,
          kicksSuccessful: 0
        }],
        skills: { technical: [], tactical: [], physical: [], mental: [] },
        injuries: [],
        reports: [],
        activities: [],
        videos: [],
        status: "available",
        currentStatus: "Minor Strain",
        coachingNotes: "Outstanding lineout work",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: "player_tane_edmed",
        personalDetails: {
          firstName: "Tane", 
          lastName: "Edmed",
          dateOfBirth: "2000-04-29",
          email: "tane.edmed@example.com",
          phone: "555-777-6666",
          address: "Auckland, New Zealand",
          emergencyContact: { name: "Contact Person", relationship: "Family", phone: "555-000-0000" }
        },
        rugbyProfile: {
          position: "First-Five",
          jerseyNumber: 10,
          dateJoinedClub: "2023-01-01",
          previousClubs: [],
          representativeHonours: []
        },
        physicalAttributes: [{
          date: "2024-01-01",
          weight: 85,
          height: 180,
          bodyFat: 9,
          leanMass: 77
        }],
        testResults: [],
        gameStats: [{
          date: "2024-01-15",
          opponent: "Season Average",
          position: "First-Five",
          minutesPlayed: 80,
          tries: 0,
          tackles: 4,
          carries: 2,
          passAccuracy: 94,
          kicksAtGoal: 8,
          kicksSuccessful: 6
        }],
        skills: { technical: [], tactical: [], physical: [], mental: [] },
        injuries: [],
        reports: [],
        activities: [],
        videos: [],
        status: "available",
        currentStatus: "Active",
        coachingNotes: "Good kicking game",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: "player_mark_telea",
        personalDetails: {
          firstName: "Mark",
          lastName: "Tele'a",
          dateOfBirth: "1995-07-24",
          email: "mark.telea@example.com",
          phone: "555-000-1111",
          address: "Auckland, New Zealand",
          emergencyContact: { name: "Contact Person", relationship: "Family", phone: "555-000-0000" }
        },
        rugbyProfile: {
          position: "Outside Back", 
          jerseyNumber: 34,
          dateJoinedClub: "2023-01-01",
          previousClubs: [],
          representativeHonours: []
        },
        physicalAttributes: [{
          date: "2024-01-01",
          weight: 87,
          height: 184,
          bodyFat: 8.2,
          leanMass: 80
        }],
        testResults: [],
        gameStats: [{
          date: "2024-01-15",
          opponent: "Season Average",
          position: "Outside Back",
          minutesPlayed: 80,
          tries: 5,
          tackles: 8,
          carries: 10,
          passAccuracy: 89,
          kicksAtGoal: 0,
          kicksSuccessful: 0
        }],
        skills: { technical: [], tactical: [], physical: [], mental: [] },
        injuries: [],
        reports: [],
        activities: [],
        videos: [],
        status: "available",
        currentStatus: "Active",
        coachingNotes: "Experienced fullback",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: "player_bryn_gordon",
        personalDetails: {
          firstName: "Bryn",
          lastName: "Gordon",
          dateOfBirth: "1997-11-22",
          email: "bryn.gordon@example.com",
          phone: "555-234-5678",
          address: "Auckland, New Zealand",
          emergencyContact: { name: "Contact Person", relationship: "Family", phone: "555-000-0000" }
        },
        rugbyProfile: {
          position: "Hooker",
          jerseyNumber: 16,
          dateJoinedClub: "2023-01-01",
          previousClubs: [],
          representativeHonours: []
        },
        physicalAttributes: [{
          date: "2024-01-01",
          weight: 102,
          height: 183,
          bodyFat: 11.8,
          leanMass: 90
        }],
        testResults: [],
        gameStats: [{
          date: "2024-01-15",
          opponent: "Season Average",
          position: "Hooker",
          minutesPlayed: 80,
          tries: 0,
          tackles: 12,
          carries: 4,
          passAccuracy: 85.2,
          kicksAtGoal: 0,
          kicksSuccessful: 0
        }],
        skills: { technical: [], tactical: [], physical: [], mental: [] },
        injuries: [],
        reports: [],
        activities: [],
        videos: [],
        status: "available",
        currentStatus: "Active",
        coachingNotes: "Strong in scrum",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: "player_cam_christie",
        personalDetails: {
          firstName: "Cam",
          lastName: "Christie",
          dateOfBirth: "1999-06-20",
          email: "cam.christie@example.com",
          phone: "555-111-2222",
          address: "Auckland, New Zealand",
          emergencyContact: { name: "Contact Person", relationship: "Family", phone: "555-000-0000" }
        },
        rugbyProfile: {
          position: "Lock",
          jerseyNumber: 4,
          dateJoinedClub: "2023-01-01",
          previousClubs: [],
          representativeHonours: []
        },
        physicalAttributes: [{
          date: "2024-01-01",
          weight: 110,
          height: 198,
          bodyFat: 10.5,
          leanMass: 98
        }],
        testResults: [],
        gameStats: [{
          date: "2024-01-15",
          opponent: "Season Average",
          position: "Lock",
          minutesPlayed: 80,
          tries: 0,
          tackles: 13,
          carries: 6,
          passAccuracy: 76,
          kicksAtGoal: 0,
          kicksSuccessful: 0
        }],
        skills: { technical: [], tactical: [], physical: [], mental: [] },
        injuries: [],
        reports: [],
        activities: [],
        videos: [],
        status: "available",
        currentStatus: "Active",
        coachingNotes: "Dominant at scrum time",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];
  }

  async createPlayer(player: InsertPlayer): Promise<Player> {
    const [newPlayer] = await db
      .insert(players)
      .values(player)
      .returning();
    return newPlayer;
  }

  async updatePlayer(id: string, playerUpdate: Partial<Player>): Promise<Player | undefined> {
    const [updatedPlayer] = await db
      .update(players)
      .set({ ...playerUpdate, updatedAt: new Date() })
      .where(eq(players.id, id))
      .returning();
    return updatedPlayer || undefined;
  }
}

export const storage = new DatabaseStorage();
