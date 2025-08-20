import { createSlice } from "@reduxjs/toolkit";
import { fetchFilesThunk } from "../thunks/fileThunks";

interface FilesSlice {
  files: FileType[];
  status: "idle" | "loading" | "succeeded" | "failed";
}

export type FileType = {
  name: string;
  active: boolean;
};
const initialState: FilesSlice = {
  files: [],
  status: "idle",
};

const filesSlice = createSlice({
  name: "files",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFilesThunk.fulfilled, (state, action) => {
        const newFiles = action.payload;
        if (state.files.length === 0) {
          state.files = newFiles.map((file) => ({
            name: file,
            active: true,
          }));
        } else {
          const updated: FileType[] = [];
          state.files.forEach((file) => {
            const stillExists = newFiles.includes(file.name);
            updated.push({
              name: file.name,
              active: stillExists,
            });
          });
          newFiles.forEach((nf) => {
            if (!state.files.find((f) => f.name === nf)) {
              updated.push({ name: nf, active: true });
            }
          });
          state.files = updated;
        }

        state.status = "succeeded";
      })
      .addCase(fetchFilesThunk.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchFilesThunk.rejected, (state) => {
        state.status = "failed";
      });
  },
});

// export const {} = filesSlice.actions;
export default filesSlice.reducer;
