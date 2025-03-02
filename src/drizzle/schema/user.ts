import { createdAt, id, updatedAt } from "@/drizzle/schemaHelper";
import { relations } from "drizzle-orm";
import { pgEnum, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { UserCourseAccessTable } from "./userCourseAccess";

export const userRoles = ["user", "admin"] as const;
export type UserRoles = (typeof userRoles)[number];
export const userRoleEnum = pgEnum("user_roles", userRoles);

export const UserTable = pgTable("users", {
  id,
  cleekUserId: text().notNull().unique(),
  email: text().notNull(),
  name: text().notNull(),
  role: userRoleEnum().notNull().default("user"),
  imageUrl: text(),
  deleteAt: timestamp({ withTimezone: true }),
  createdAt,
  updatedAt,
});

export const UserRelationships = relations(UserTable, ({ many }) => ({
  userCourseAccess: many(UserCourseAccessTable),
}));
