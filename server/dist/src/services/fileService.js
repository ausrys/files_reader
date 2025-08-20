"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.scanFiles = scanFiles;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
// Current working directory
const FILES_PATH = path_1.default.join(process.cwd(), '/data');
function scanFiles() {
    const files = fs_1.default.readdirSync(FILES_PATH);
    return files;
}
