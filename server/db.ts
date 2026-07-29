import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "@shared/schema";

// This file only runs when DATABASE_URL is set (see storage.ts for the fallback).
// Get a free Postgres instance at https://neon.tech or https://supabase.com,
// then set DATABASE_URL in your environment (.env locally, or your host's
// environment variables in production).

if (!process.env.DATABASE_URL) {
  throw new Error(
    "DATABASE_URL is not set. db.ts should only be imported when it is."
  );
}

const sql = neon(process.env.DATABASE_URL);
export const db = drizzle(sql, { schema });
