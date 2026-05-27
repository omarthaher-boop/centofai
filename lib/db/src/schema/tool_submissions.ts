import { pgTable, text, serial, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";

export const toolSubmissionsTable = pgTable("tool_submissions", {
  id: serial("id").primaryKey(),
  userId: text("user_id").notNull(),
  name: text("name").notNull(),
  category: text("category").notNull(),
  description: text("description").notNull(),
  pricing: text("pricing").notNull(),
  audience: text("audience"),
  url: text("url").notNull(),
  status: text("status").notNull().default("pending"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const insertToolSubmissionSchema = createInsertSchema(toolSubmissionsTable).omit({
  id: true,
  userId: true,
  status: true,
  createdAt: true,
});

export type InsertToolSubmission = typeof insertToolSubmissionSchema._output;
export type ToolSubmission = typeof toolSubmissionsTable.$inferSelect;
