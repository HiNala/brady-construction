import { defineConfig } from "drizzle-kit";

// Load local env files if present (drizzle-kit doesn't do it automatically)
try {
  process.loadEnvFile(".env.local");
} catch {}
try {
  process.loadEnvFile(".env");
} catch {}

export default defineConfig({
  dialect: "postgresql",
  schema: "./src/lib/db/schema.ts",
  out: "./drizzle",
  dbCredentials: {
    url:
      process.env.DATABASE_URL ??
      "postgres://brady:brady@localhost:5432/brady",
  },
});
