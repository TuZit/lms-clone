import { createdAt, id, name, updatedAt } from "@/drizzle/schemaHelper";
import { relations } from "drizzle-orm";
import { integer, pgEnum, pgTable, text, uuid } from "drizzle-orm/pg-core";
import { CourseSectionTable } from "./courseSection";
import { UserLessonCompleteTable } from "./userLessonComplete";

export const lessonStatus = ["public", "private", "preview"] as const;
export type LessonStatus = (typeof lessonStatus)[number];
export const lessonStatusEnum = pgEnum("lesson_status", lessonStatus);

export const LesstionTable = pgTable("lesson", {
  id,
  name,
  youtubeVideoId: text().notNull(),
  description: text(),
  order: integer().notNull(),
  sectionId: uuid()
    .notNull()
    .references(() => CourseSectionTable.id, { onDelete: "cascade" }),
  status: lessonStatusEnum().notNull().default("private"),
  createdAt,
  updatedAt,
});

export const LessonRelationships = relations(
  LesstionTable,
  ({ one, many }) => ({
    section: one(CourseSectionTable, {
      fields: [LesstionTable.sectionId],
      references: [CourseSectionTable.id],
    }),
    userLessonComplete: many(UserLessonCompleteTable),
  })
);
