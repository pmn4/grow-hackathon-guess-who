import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { profiles, providers } from "./schema";

const schema = {
  profiles,
  providers,
};

const client = postgres({
  host: "localhost",
  port: 5432, // This should be a number
  user: "guess_who_user",
  password: "your_secure_password",
  database: "guess_who_db",
});

export const db = drizzle(client, { schema });
