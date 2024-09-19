import { pgEnum, pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const membershipEnum = pgEnum("membership", ["free", "pro"]);

export const profiles = pgTable("profiles", {
  userId: text("user_id").primaryKey().notNull(),
  membership: membershipEnum("membership").notNull().default("free"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
});

export type SelectProfile = typeof profiles.$inferSelect;
export type InsertProfile = Omit<
  typeof profiles.$inferInsert,
  "id" | "createdAt" | "updatedAt"
>;
