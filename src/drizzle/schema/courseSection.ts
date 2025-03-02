import { createdAt, id, name, updatedAt } from "@/drizzle/schemaHelper";
import { relations } from "drizzle-orm";
import { integer, pgEnum, pgTable, uuid } from "drizzle-orm/pg-core";
import { CourseTable } from "./course";
import { LesstionTable } from "./lesson";

export const courseSectionStatus = ["public", "private"] as const;
export type CourseSectionStatus = (typeof courseSectionStatus)[number];
export const courseSectionStatusEnum = pgEnum(
  "course_sections_status",
  courseSectionStatus
);

export const CourseSectionTable = pgTable("course_sections", {
  id,
  courseId: uuid()
    .notNull()
    .references(() => CourseTable.id, { onDelete: "cascade" }),
  name,
  status: courseSectionStatusEnum().notNull().default("private"),
  createdAt,
  updatedAt,
  order: integer().notNull(),
});

export const CourseSectionRelationships = relations(
  CourseSectionTable,
  ({ one, many }) => ({
    course: one(CourseTable, {
      fields: [CourseSectionTable.courseId],
      references: [CourseTable.id],
    }),
    lessons: many(LesstionTable),
  })
);
