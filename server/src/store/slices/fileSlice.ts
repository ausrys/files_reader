import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Shape of a single file in state
interface FileState {
    name: string;
    active: boolean;
}

// Redux slice for files
const filesSlice = createSlice({
    name: 'files',
    initialState: [] as FileState[],
    reducers: {
        // Set state on startup with files list (after scanning a folder)
        setFiles: (_, action: PayloadAction<string[]>) => {
            return action.payload.map((fileName) => ({
                name: fileName,
                active: true,
            }));
        },
        // Rescaned files are checked with state, state updated accordingly
        rescanFilesReducer: (state, action: PayloadAction<string[]>) => {
            const updatedFiles: FileState[] = [];
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
export const { setFiles, rescanFilesReducer } = filesSlice.actions;

export default filesSlice.reducer;
