import axios from "axios";

const rawApiUrl =
  import.meta.env.VITE_API_URL || "http://localhost:4000/api/v1";

export const API_BASE_URL = rawApiUrl.replace(/\/+$/, "");

export const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

export const getErrorMessage = (
  error,
  fallback = "Something went wrong. Please try again."
) => error.response?.data?.message || error.message || fallback;
