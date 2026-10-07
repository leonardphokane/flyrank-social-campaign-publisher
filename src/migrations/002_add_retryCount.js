// migrations/002_add_retryCount.js
export function up(db) {
  // Add retryCount and errorMessage columns to campaigns table
  db.prepare(`
    ALTER TABLE campaigns
    ADD COLUMN retryCount INTEGER DEFAULT 0
  `).run();

  db.prepare(`
    ALTER TABLE campaigns
    ADD COLUMN errorMessage TEXT
  `).run();
}

export function down(db) {
  // SQLite doesn’t support DROP COLUMN directly,
  // so rollback would require table recreation.
  // For simplicity, we’ll leave this empty.
}
