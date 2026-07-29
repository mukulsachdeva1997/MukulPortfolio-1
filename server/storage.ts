import { type User, type InsertUser, type ContactMessage, type InsertContactMessage, users, contactMessages } from "@shared/schema";
import { randomUUID } from "crypto";
import { eq } from "drizzle-orm";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createContactMessage(message: InsertContactMessage): Promise<ContactMessage>;
  getContactMessages(): Promise<ContactMessage[]>;
}

// Real Postgres-backed storage. Only constructed when DATABASE_URL is set
// (see the `storage` export at the bottom of this file).
export class DbStorage implements IStorage {
  private db: typeof import("./db").db;

  constructor(db: typeof import("./db").db) {
    this.db = db;
  }

  async getUser(id: string): Promise<User | undefined> {
    const [user] = await this.db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await this.db.select().from(users).where(eq(users.username, username));
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await this.db.insert(users).values(insertUser).returning();
    return user;
  }

  async createContactMessage(insertMessage: InsertContactMessage): Promise<ContactMessage> {
    const [message] = await this.db
      .insert(contactMessages)
      .values(insertMessage)
      .returning();
    return message;
  }

  async getContactMessages(): Promise<ContactMessage[]> {
    return this.db.select().from(contactMessages);
  }
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private contactMessages: Map<string, ContactMessage>;

  constructor() {
    this.users = new Map();
    this.contactMessages = new Map();
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createContactMessage(insertMessage: InsertContactMessage): Promise<ContactMessage> {
    const id = randomUUID();
    const message: ContactMessage = {
      ...insertMessage,
      id,
      createdAt: new Date(),
    };
    this.contactMessages.set(id, message);
    return message;
  }

  async getContactMessages(): Promise<ContactMessage[]> {
    return Array.from(this.contactMessages.values());
  }
}

// Use real Postgres when DATABASE_URL is configured, otherwise fall back to
// in-memory storage (fine for local dev, but data won't survive a restart).
async function createStorage(): Promise<IStorage> {
  if (process.env.DATABASE_URL) {
    const { db } = await import("./db");
    console.log("[storage] Using Postgres (DATABASE_URL detected)");
    return new DbStorage(db);
  }
  console.log("[storage] DATABASE_URL not set — using in-memory storage. Data will not persist across restarts.");
  return new MemStorage();
}

export const storage: IStorage = await createStorage();
