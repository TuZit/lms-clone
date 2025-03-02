import {
  createdAt,
  description,
  id,
  name,
  updatedAt,
} from "@/drizzle/schemaHelper";
import { relations } from "drizzle-orm";
import { pgTable } from "drizzle-orm/pg-core";
import { CourseProductTable } from "./courseProduct";
import { UserCourseAccessTable } from "./userCourseAccess";

export const CourseTable = pgTable("course", {
  id,
  name,
  description,
  createdAt,
  updatedAt,
});

export const CourseRelationships = relations(CourseTable, ({ many }) => ({
  courseProduct: many(CourseProductTable),
  userCourseAccess: many(UserCourseAccessTable),
}));
