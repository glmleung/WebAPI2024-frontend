import axios from "axios";

const BACKEND_URL = "http://localhost:10888";

export const client = axios.create({
  baseURL: BACKEND_URL,
  headers: {
    "Content-Type": "application/json",
  },
});


