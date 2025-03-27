import axios from "axios";

// DEV SERVER
// const BASE_URL = "https://aproxyluxe-production.up.railway.app";

// PROD SERVER
// const BASE_URL = "https://api.proxy.luxe";

// LOCAL SERVER
const BASE_URL = "http://localhost:6001";

export const apiClient = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // Required for cookies (refresh token)
});
