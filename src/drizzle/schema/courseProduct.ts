import { relations } from "drizzle-orm";
import {
  pgTable,
  integer,
  text,
  pgEnum,
  uuid,
  primaryKey,
} from "drizzle-orm/pg-core";
import {
  id,
  name,
  description,
  createdAt,
  updatedAt,
} from "@/drizzle/schemaHelper";
import { CourseTable } from "./course";
import { ProductTable } from "./products";

export const courseProductStatus = ["public", "private"] as const;
export type CourseProductStatus = (typeof courseProductStatus)[number];
export const courseProductStatusEnum = pgEnum(
  "product_stauts",
  courseProductStatus
);

export const CourseProductTable = pgTable(
  "course_product",
  {
    courseId: uuid()
      .notNull()
      .references(() => CourseTable.id, { onDelete: "restrict" }),
    productId: uuid()
      .notNull()
      // xóa hết các mối liên hệ với course nếu delete
      .references(() => ProductTable.id, { onDelete: "cascade" }),
    name,
    description,
    createdAt,
    updatedAt,
    priceInDollars: integer().notNull(),
    imageUrl: text().notNull(),
    status: courseProductStatusEnum().notNull().default("private"),
  },
  //   tạo 1 unique ID giữa 2 thg course vs product
  //   tránh 2 tables có trùng ID
  (t) => [
    primaryKey({
      columns: [t.courseId, t.productId],
    }),
  ]
);

export const CourseProductRelationships = relations(
  CourseProductTable,
  ({ one, many }) => ({
    course: one(CourseTable, {
      fields: [CourseProductTable.courseId],
      references: [CourseTable.id],
    }),
    product: one(ProductTable, {
      fields: [CourseProductTable.productId],
      references: [ProductTable.id],
    }),
  })
);
