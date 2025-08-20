import Database from 'better-sqlite3';
import path from 'path';

// Create or open the SQLite database file
const dbPath = path.resolve(__dirname, '../files.db'); // database file in project root
const db = new Database(dbPath);

// Create the table if it doesn't exist
db.prepare(
    `
  CREATE TABLE IF NOT EXISTS files (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL UNIQUE,
    active BOOLEAN NOT NULL DEFAULT 1,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`,
).run();

export default db;
