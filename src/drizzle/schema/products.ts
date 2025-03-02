import { relations } from "drizzle-orm";
import { pgTable, integer, text, pgEnum } from "drizzle-orm/pg-core";
import {
  id,
  name,
  description,
  createdAt,
  updatedAt,
} from "@/drizzle/schemaHelper";
import { CourseProductTable } from "./courseProduct";

export const productStatus = ["public", "private"] as const;
export type ProductStatus = (typeof productStatus)[number];
export const productStatusEnum = pgEnum("product_stauts", productStatus);

export const ProductTable = pgTable("product", {
  id,
  name,
  description,
  createdAt,
  updatedAt,
  priceInDollars: integer().notNull(),
  imageUrl: text().notNull(),
  status: productStatusEnum().notNull().default("private"),
});

export const ProductRelationships = relations(ProductTable, ({ many }) => ({
  courseProduct: many(CourseProductTable),
}));
