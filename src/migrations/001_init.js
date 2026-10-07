import Database from 'better-sqlite3';

export default function migrate() {
  const db = new Database('campaigns.db');

  // Initial schema
  db.prepare(`
    CREATE TABLE IF NOT EXISTS campaigns (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      platform TEXT,
      caption TEXT,
      imagePath TEXT,
      status TEXT,
      updatedAt TEXT
    )
  `).run();

  console.log("Migration 001_init applied successfully.");
}

// Run immediately when imported
migrate();
