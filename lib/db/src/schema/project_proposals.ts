import { pgTable, text, serial, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";

export const projectProposalsTable = pgTable("project_proposals", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  idea: text("idea").notNull(),
  budget: text("budget"),
  timeline: text("timeline"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const insertProjectProposalSchema = createInsertSchema(projectProposalsTable)
  .omit({ id: true, createdAt: true });

export type InsertProjectProposal = typeof insertProjectProposalSchema._output;
export type ProjectProposal = typeof projectProposalsTable.$inferSelect;
