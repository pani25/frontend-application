import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://backend-application-blue.vercel.app/api";

const api = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

// helper untuk set auth header setelah login
export const setAuthToken = (token: string | null) => {
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common["Authorization"];
  }
};
console.log(">>> BaseURL dari axios:", baseURL);
export default api;
