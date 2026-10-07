import sqlite3 from 'sqlite3';

sqlite3.verbose();
const db = new sqlite3.Database('./db.sqlite');

// Initialize tables if not exist
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS campaigns (
    id TEXT PRIMARY KEY,
    title TEXT,
    body TEXT,
    url TEXT,
    status TEXT,
    created_at TEXT,
    retryCount INTEGER DEFAULT 0,
    errorMessage TEXT
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS posts (
    id TEXT PRIMARY KEY,
    campaign_id TEXT,
    platform TEXT,
    caption TEXT,
    image_path TEXT,
    scheduled_time TEXT,
    status TEXT,
    FOREIGN KEY(campaign_id) REFERENCES campaigns(id)
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS statuses (
    post_id TEXT,
    state TEXT,
    updated_at TEXT,
    FOREIGN KEY(post_id) REFERENCES posts(id)
  )`);
});

export default db;
