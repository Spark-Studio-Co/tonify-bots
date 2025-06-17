import axios from "axios";

// DEV SERVER
// const BASE_URL = "https://aproxyluxe-production.up.railway.app";

// PROD SERVER
const BASE_URL = "https://tonify-server-production-f45b.up.railway.app/api";

// LOCAL SERVER
// const BASE_URL = "http://localhost:6001/api";

export const apiClient = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // Required for cookies (refresh token)
});

// Add token to requests
apiClient.interceptors.request.use(
  (config) => {
    // Get token from auth-storage (Zustand persist)
    const authStorage = localStorage.getItem("auth-storage");
    let token = null;

    if (authStorage) {
      try {
        const parsed = JSON.parse(authStorage);
        token = parsed.state?.token;
      } catch (e) {
        console.error("Failed to parse auth-storage:", e);
      }
    }

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
