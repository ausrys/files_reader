"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.scanFiles = scanFiles;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
// Current directory where the code is called from (src/services) adjust path based on that
const FILES_PATH = path_1.default.join(__dirname, './../data');
// Scan files from provided directory
function scanFiles() {
    // If folder does not exits -> create one
    if (!fs_1.default.existsSync(FILES_PATH))
        fs_1.default.mkdirSync(FILES_PATH, { recursive: true });
    const files = fs_1.default.readdirSync(FILES_PATH);
    return files;
}
