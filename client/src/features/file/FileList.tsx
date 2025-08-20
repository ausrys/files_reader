import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../store";
import { fetchFilesThunk } from "../../store/thunks/fileThunks";

export default function FileList() {
  const dispatch = useDispatch<AppDispatch>();
  const { files, status } = useSelector((state: RootState) => state.files);
  if (status === "loading") return <p>Loading...</p>;
  if (status === "failed") return <p>Something went wrong, try later...</p>;
  const handleScan = async () => {
    dispatch(fetchFilesThunk());
  };
  return (
    <div>
      <button onClick={handleScan}>Rescan</button>
      <ul>
        {files.length > 0
          ? files.map((f, index) => (
              <li key={index}>
                <pre>{JSON.stringify(f, null, 2)}</pre>
              </li>
            ))
          : null}
      </ul>
    </div>
  );
}
