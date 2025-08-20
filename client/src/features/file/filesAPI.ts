import axios from "../../services/axios";

export const getFiles = async (): Promise<string[]> => {
  const res = await axios.get("/files/all");
  return res.data;
};
