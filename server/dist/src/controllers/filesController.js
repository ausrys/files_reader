"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.downloadState = exports.rescanFiles = exports.getFiles = void 0;
const store_1 = require("../store/store");
const fileService_1 = require("../services/fileService");
const fileSlice_1 = require("../store/slices/fileSlice");
// Get current state and send it
const getFiles = (_, res) => {
    try {
        const state = store_1.store.getState();
        res.status(200).json(state.files);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.getFiles = getFiles;
// Scanning and sending files
const rescanFiles = (_, res) => {
    try {
        store_1.store.dispatch((0, fileSlice_1.rescanFilesReducer)((0, fileService_1.scanFiles)()));
        const state = store_1.store.getState();
        res.status(200).json(state.files);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.rescanFiles = rescanFiles;
// Download current state as json file
const downloadState = (_, res) => {
    try {
        const state = store_1.store.getState();
        const json = JSON.stringify(state.files, null, 2);
        res.setHeader('Content-Disposition', 'attachment; filename=state_dump.json');
        res.setHeader('Content-Type', 'application/json');
        res.send(json);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.downloadState = downloadState;
