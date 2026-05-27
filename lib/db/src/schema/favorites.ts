import { pgTable, text, serial, timestamp, uniqueIndex } from "drizzle-orm/pg-core";

export const favoritesTable = pgTable(
  "favorites",
  {
    id: serial("id").primaryKey(),
    userId: text("user_id").notNull(),
    toolName: text("tool_name").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => ({
    userToolIdx: uniqueIndex("favorites_user_tool_idx").on(t.userId, t.toolName),
  }),
);

export type Favorite = typeof favoritesTable.$inferSelect;
