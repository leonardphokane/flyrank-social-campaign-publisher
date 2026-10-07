import Database from 'better-sqlite3';

const db = new Database('campaigns.db');

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

export default db;
