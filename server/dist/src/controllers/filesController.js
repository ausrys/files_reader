"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFiles = void 0;
const fileService_1 = require("../services/fileService");
// Scanning and sending files
const getFiles = (_, res) => {
    try {
        const files = (0, fileService_1.scanFiles)();
        res.status(200).json(files);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.getFiles = getFiles;
