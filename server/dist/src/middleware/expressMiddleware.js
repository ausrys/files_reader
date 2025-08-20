"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notFoundHandler = notFoundHandler;
// 404 handler
function notFoundHandler(_, res, next) {
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
