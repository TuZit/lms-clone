import { defineConfig } from "drizzle-kit";
import { env } from "./src/envi/server";

export default defineConfig({
  out: "./src/drizzle/migrations",
  schema: "./src/drizzle/schema.ts",
  strict: true,
  verbose: true,
  dbCredentials: {
    password: env.DB_PASSWORD,
    user: env.DB_USER,
    database: env.DB_NAME ?? "huhu",
    host: env.DB_HOST || "localhost",
    ssl: false,
  },
  dialect: "postgresql",
}); //
