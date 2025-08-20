import { createAsyncThunk } from "@reduxjs/toolkit";
import { getFiles } from "../../features/file/filesAPI";

export const fetchFilesThunk = createAsyncThunk("files/fetchFiles", getFiles);
