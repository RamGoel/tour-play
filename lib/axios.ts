import axios, { AxiosError } from "axios";

export const API = axios.create({
  baseURL: "/api",
});

export const parseAxiosMessage = (err: unknown) => {
  return (
    ((err as AxiosError).response?.data as { error: string })?.error ||
    "Something went wrong"
  );
};
