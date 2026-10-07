import fs from 'fs';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function runMigrations() {
  const migrationsDir = path.join(__dirname, 'migrations');
  const files = fs.readdirSync(migrationsDir).sort();

  for (const file of files) {
    console.log(`Running migration: ${file}`);
    const filePath = path.join(migrationsDir, file);
    // Convert Windows path to file:// URL
    const fileUrl = pathToFileURL(filePath).href;
    await import(fileUrl);
  }
}

runMigrations().catch(err => {
  console.error("Migration failed:", err);
  process.exit(1);
});
