"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("./routes"));
dotenv_1.default.config();
// Init express ap
const app = (0, express_1.default)();
// Middleware
app.use((0, cors_1.default)({
    credentials: true,
    origin: ['http://localhost:5173'],
}));
app.use(express_1.default.json());
// Routes
app.use('/api/v1', routes_1.default);
exports.default = app;
