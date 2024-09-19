import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./db/schema/index.ts",
  out: "./db/migrations",
  dialect: "postgresql",
  dbCredentials: {
    host: "localhost",
    port: 5432, // This should be a number
    user: "guess_who_user",
    password: "your_secure_password",
    database: "guess_who_db",
  },
});
