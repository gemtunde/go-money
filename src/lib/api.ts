import axios from "axios";
import { env } from "./env";

export const api = axios.create({
  baseURL: env.NEXT_PUBLIC_API_BASE_URL,
  timeout: env.NEXT_PUBLIC_API_TIMEOUT_MS,
  headers: { "Content-Type": "application/json" },
});
