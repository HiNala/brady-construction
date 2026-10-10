import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

const connectionString =
  process.env.DATABASE_URL ??
  "postgres://brady:brady@localhost:5432/brady";

// Singleton across HMR in dev
const globalForDb = globalThis as unknown as {
  __bradySql?: postgres.Sql;
  __bradyDb?: ReturnType<typeof createDb>;
};

function createDb() {
  const sql = postgres(connectionString, {
    max: 10,
    prepare: true,
    idle_timeout: 20,
    connect_timeout: 20,
  });
  globalForDb.__bradySql = sql;
  return drizzle(sql, { schema });
}

export const db = globalForDb.__bradyDb ?? createDb();
if (process.env.NODE_ENV !== "production") globalForDb.__bradyDb = db;

export { schema };
