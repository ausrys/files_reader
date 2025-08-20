import fs from 'fs';
import path from 'path';

// Current directory where the code is called from (src/services) adjust path based on that
const FILES_PATH = path.join(__dirname, './../data');
// Scan files from provided directory
export function scanFiles() {
    // If folder does not exits -> create one
    if (!fs.existsSync(FILES_PATH)) fs.mkdirSync(FILES_PATH, { recursive: true });
    const files = fs.readdirSync(FILES_PATH);
    return files;
}
