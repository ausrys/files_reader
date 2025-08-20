import { Request, Response } from 'express';
import { store } from '../store/store';
import { scanFiles } from '../services/fileService';
import { rescanFilesReducer } from '../store/slices/fileSlice';

// Get current state and send it
export const getFiles = (_: Request, res: Response) => {
    try {
        const state = store.getState();
        res.status(200).json(state.files);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Scanning and sending files
export const rescanFiles = (_: Request, res: Response) => {
    try {
        store.dispatch(rescanFilesReducer(scanFiles()));
        const state = store.getState();
        res.status(200).json(state.files);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Download current state as json file
export const downloadState = (_: Request, res: Response) => {
    try {
        const state = store.getState();
        const json = JSON.stringify(state.files, null, 2);

        res.setHeader('Content-Disposition', 'attachment; filename=state_dump.json');
        res.setHeader('Content-Type', 'application/json');
        res.send(json);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
