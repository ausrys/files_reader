import { useDispatch } from "react-redux";
import FileList from "./features/file/FileList";
import type { AppDispatch } from "./store";
import { useEffect } from "react";
import { fetchFilesThunk } from "./store/thunks/fileThunks";

function App() {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(fetchFilesThunk());
  }, [dispatch]);
  return (
    <>
      <FileList />
    </>
  );
}

export default App;
