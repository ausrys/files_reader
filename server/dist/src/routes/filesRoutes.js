"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.filesRouter = void 0;
const express_1 = require("express");
const filesController_1 = require("../controllers/filesController");
exports.filesRouter = (0, express_1.Router)();
exports.filesRouter.get('/list', filesController_1.getFiles);
exports.filesRouter.get('/scan', filesController_1.rescanFiles);
exports.filesRouter.get('/download-state', filesController_1.downloadState);
