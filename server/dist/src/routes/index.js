"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const filesRoutes_1 = require("./filesRoutes");
// Main router
const router = (0, express_1.Router)();
router.use('/files', filesRoutes_1.filesRouter);
exports.default = router;
