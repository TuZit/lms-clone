import { createdAt, id, updatedAt } from "@/drizzle/schemaHelper";
import { relations } from "drizzle-orm";
import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { LesstionTable } from "./lesson";
import { UserTable } from "./user";

export const UserLessonCompleteTable = pgTable("user_lesson_complete", {
  id,
  userId: uuid()
    .notNull()
    .references(() => UserTable.id, { onDelete: "cascade" }),
  lessonId: uuid()
    .notNull()
    .references(() => LesstionTable.id, { onDelete: "cascade" }),
  createdAt,
  updatedAt,
});

export const UserLessonCompleteRelationships = relations(
  UserLessonCompleteTable,
  ({ one }) => ({
    user: one(UserTable, {
      fields: [UserLessonCompleteTable.userId],
      references: [UserTable.id],
    }),
    lesson: one(LesstionTable, {
      fields: [UserLessonCompleteTable.lessonId],
      references: [LesstionTable.id],
    }),
  })
);
