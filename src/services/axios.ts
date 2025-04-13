import axios from "axios";

export const axiosInstance = (
  hash: string,
  headers: Record<string, string> | undefined
) => {
  const axiosInstance = axios.create({
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${hash}`,
      "Content-Type": "application/json",
      ...headers,
    },
  });

  return axiosInstance;
};
