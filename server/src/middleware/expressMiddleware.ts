import { Request, Response, NextFunction } from 'express';

// 404 handler
export function notFoundHandler(_: Request, res: Response, next: NextFunction) {
    res.status(404).json({
        error: 'Endpoint not found',
        apiFullAdress: '/api/v1/files',
        message: 'Please visit one of the following endpoints:',
        availableEndpoints: [
            { method: 'GET', path: '/list' },
            { method: 'GET', path: '/scan' },
            { method: 'GET', path: '/download-state' },
        ],
    });
}
