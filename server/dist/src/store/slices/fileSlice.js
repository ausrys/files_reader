"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.rescanFilesReducer = exports.setFiles = void 0;
const toolkit_1 = require("@reduxjs/toolkit");
// Redux slice for files
const filesSlice = (0, toolkit_1.createSlice)({
    name: 'files',
    initialState: [],
    reducers: {
        // Set state on startup with files list (after scanning a folder)
        setFiles: (_, action) => {
            return action.payload.map((fileName) => ({
                name: fileName,
                active: true,
            }));
        },
        // Rescaned files are checked with state, state updated accordingly
        rescanFilesReducer: (state, action) => {
            const updatedFiles = [];
            state.forEach((file) => {
                // First we check if files still exist in directory compared to the state
                const stillExists = action.payload.includes(file.name); // return boolean
                updatedFiles.push({
                    name: file.name,
                    active: stillExists,
                });
            });
            // Second, we add new files that did not exist in the state
            action.payload.forEach((newFile) => {
                // Check if new file exists in the state. We compare names because all file names must be unique
                if (!state.find((f) => f.name === newFile))
                    updatedFiles.push({ name: newFile, active: true });
            });
            return updatedFiles;
        },
    },
});
// Export actions
_a = filesSlice.actions, exports.setFiles = _a.setFiles, exports.rescanFilesReducer = _a.rescanFilesReducer;
exports.default = filesSlice.reducer;
