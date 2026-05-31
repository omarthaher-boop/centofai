import { pgTable, text, serial, timestamp, uniqueIndex } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";

export const newsletterSubscribersTable = pgTable(
  "newsletter_subscribers",
  {
    id: serial("id").primaryKey(),
    email: text("email").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => ({
    emailIdx: uniqueIndex("newsletter_subscribers_email_idx").on(t.email),
  }),
);

export const insertNewsletterSubscriberSchema = createInsertSchema(newsletterSubscribersTable)
  .omit({ id: true, createdAt: true });

export type NewsletterSubscriber = typeof newsletterSubscribersTable.$inferSelect;
