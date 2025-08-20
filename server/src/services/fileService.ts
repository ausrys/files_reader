import fs from 'fs';
import path from 'path';
import db from '../config/db';
// Current working directory
const FILES_PATH = path.join(process.cwd(), '/data');

// Scan files from provided directory
export function scanFiles() {
    const files = fs.readdirSync(FILES_PATH);
    return files;
}

// Get all files
export function getFiles() {
    return db.prepare('SELECT * FROM files').all();
}

// Insert new file
export function addFile(name: string) {
    const stmt = db.prepare(`
    INSERT OR IGNORE INTO files (name, active) VALUES (?, 1)
  `);
    stmt.run(name);
}

// Update file status
export function updateFileStatus(name: string, active: boolean) {
    const stmt = db.prepare(`
    UPDATE files SET active = ?, updated_at = CURRENT_TIMESTAMP WHERE name = ?
  `);
    stmt.run(active ? 1 : 0, name);
}
