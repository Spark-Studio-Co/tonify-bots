import axios from "axios";

// DEV SERVER
// const BASE_URL = "https://aproxyluxe-production.up.railway.app";

// PROD SERVER
// const BASE_URL = "https://tonify-server-production.up.railway.app/api";

// LOCAL SERVER
const BASE_URL = "http://localhost:6001/api";

export const apiClient = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // Required for cookies (refresh token)
});
