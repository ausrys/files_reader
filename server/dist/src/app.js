"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const routes_1 = __importDefault(require("./routes"));
const expressMiddleware_1 = require("./middleware/expressMiddleware");
dotenv_1.default.config();
// Init express ap
const app = (0, express_1.default)();
// Middleware
app.use(express_1.default.json());
// Routes
app.use('/api/v1', routes_1.default);
app.use(expressMiddleware_1.notFoundHandler); // Not found page handler
exports.default = app;
