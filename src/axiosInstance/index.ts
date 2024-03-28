import axios, { AxiosRequestConfig } from "axios";
import { baseUrl } from "./constants";

export function getJWTHeader(token: string): Record<string, string> {
  return { Authorization: `Bearer ${token}` };
}

const config: AxiosRequestConfig = { baseURL: baseUrl };
export const axiosInstance = axios.create(config);
