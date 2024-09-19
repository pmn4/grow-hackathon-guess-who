import { sql } from "drizzle-orm";
import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const providers = pgTable("providers", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  imageUrl: text("image_url").notNull(),
  imageDescription: text("image_description").notNull(),
  description: text("description").notNull(),
  createdAt: timestamp("created_at").default(sql`CURRENT_TIMESTAMP`),
  updatedAt: timestamp("updated_at").default(sql`CURRENT_TIMESTAMP`),
});

export type SelectProvider = typeof providers.$inferSelect;
export type InsertProvider = Omit<
  typeof providers.$inferInsert,
  "id" | "createdAt" | "updatedAt"
>;
