import { Request, Response } from 'express';
import { scanFiles } from '../services/fileService';

// Scanning and sending files
export const getFiles = (_: Request, res: Response) => {
    try {
        const files = scanFiles();
        res.status(200).json(files);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
