"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const fileService_1 = require("./services/fileService");
const fileSlice_1 = require("./store/slices/fileSlice");
const store_1 = require("./store/store");
const PORT = process.env.PORT || 3000;
const startServer = async () => {
    try {
        app_1.default.listen(PORT, () => {
            console.log(`Server listening on http://localhost:${PORT}`);
            // On app start we scan and set files to redux state
            const filesInTheDir = (0, fileService_1.scanFiles)();
            store_1.store.dispatch((0, fileSlice_1.setFiles)(filesInTheDir));
        });
    }
    catch (error) {
        console.error('Server error:', error);
        process.exit(1);
    }
};
startServer();
