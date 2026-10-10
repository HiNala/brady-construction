/**
 * Local dev Postgres without Docker — boots a real embedded Postgres on :5432,
 * applies db/init.sql, seeds articles, then stays running.
 * Usage: node scripts/dev-db.mjs
 */
import { readFileSync, mkdirSync } from "node:fs";
import { spawn } from "node:child_process";
import EmbeddedPostgres from "embedded-postgres";
import postgres from "postgres";

const DATA_DIR = "./.pgdata";
const PORT = 5432;
const URL = "postgres://brady:brady@localhost:5432/brady";

mkdirSync(DATA_DIR, { recursive: true });

const pg = new EmbeddedPostgres({
  databaseDir: DATA_DIR,
  user: "brady",
  password: "brady",
  port: PORT,
  persistent: true,
});

console.log("→ Initializing embedded Postgres…");
await pg.initialise();
console.log("→ Starting Postgres on :5432 …");
await pg.start();

await pg.createDatabase("brady").catch(() => {
  /* already exists */
});

const sql = postgres(URL, { max: 2 });

console.log("→ Applying db/init.sql …");
await sql.unsafe(readFileSync("db/init.sql", "utf8"));

console.log("→ Seeding articles …");
const seed = spawn(process.execPath, ["scripts/seed.mjs", "--no-push"], {
  stdio: "inherit",
  env: { ...process.env, DATABASE_URL: URL },
});
await new Promise((res) => seed.on("exit", res));

console.log("\n✓ Dev database ready at " + URL);
console.log("  Keep this running. Ctrl+C to stop.\n");

// Keep alive; graceful shutdown
process.on("SIGINT", async () => {
  console.log("\nStopping Postgres…");
  await sql.end();
  await pg.stop();
  process.exit(0);
});
setInterval(() => {}, 60000);
