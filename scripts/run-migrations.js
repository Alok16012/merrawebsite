// Applies all CRM migrations in supabase/migrations to the Supabase Postgres DB.
//
// Usage:
//   DATABASE_URL="postgresql://postgres:<password>@db.<project-ref>.supabase.co:5432/postgres" node scripts/run-migrations.js
//
// Get the connection string from: Supabase Dashboard → Project Settings →
// Database → Connection string (URI). Never hardcode it in this file.

const { Client } = require('pg');
const fs = require('fs');
const path = require('path');

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  console.error('ERROR: Set the DATABASE_URL environment variable first.');
  console.error('Example:');
  console.error('  DATABASE_URL="postgresql://postgres:PASSWORD@db.PROJECT.supabase.co:5432/postgres" node scripts/run-migrations.js');
  process.exit(1);
}

const dir = path.join(__dirname, '..', 'supabase', 'migrations');
const migrations = fs
  .readdirSync(dir)
  .filter((f) => f.endsWith('.sql'))
  .sort();

async function run() {
  const client = new Client({ connectionString });
  await client.connect();
  console.log(`Connected. Applying ${migrations.length} migrations...`);

  let applied = 0;
  for (const m of migrations) {
    const sql = fs.readFileSync(path.join(dir, m), 'utf8');
    try {
      await client.query(sql);
      applied++;
      console.log(`  ok    ${m}`);
    } catch (err) {
      console.error(`  FAIL  ${m}: ${err.message}`);
      console.error('Stopping. Fix the error and re-run (already-applied migrations may error harmlessly on re-run if they are not idempotent).');
      break;
    }
  }

  await client.end();
  console.log(`Done. ${applied}/${migrations.length} applied.`);
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
