import { useAuthStore } from "@/store/auth";
import axios, { type InternalAxiosRequestConfig } from "axios";

export const api = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
});

type RetryRequestConfig = InternalAxiosRequestConfig & {
  _retry?: boolean;
};

// 1. 요청 인터셉터: 모든 요청 헤더에 Access Token 심기
api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().accessToken;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

let refreshPromise: Promise<string> | null = null;

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (!axios.isAxiosError(error)) {
      return Promise.reject(error);
    }

    const originalRequest = error.config as RetryRequestConfig | undefined;

    if (!originalRequest) {
      return Promise.reject(error);
    }

    if (error.response?.status !== 401) {
      return Promise.reject(error);
    }

    if (originalRequest.url === "/auth/refresh") {
      useAuthStore.setState({ accessToken: undefined });
      return Promise.reject(error);
    }

    if (originalRequest._retry) {
      useAuthStore.setState({ accessToken: undefined });
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    try {
      if (!refreshPromise) {
        refreshPromise = api
          .post("/auth/refresh")
          .then((res) => res.data.accessToken)
          .finally(() => {
            refreshPromise = null;
          });
      }

      const accessToken = await refreshPromise;

      useAuthStore.setState({ accessToken });

      originalRequest.headers.Authorization = `Bearer ${accessToken}`;

      return api(originalRequest);
    } catch (refreshError) {
      useAuthStore.setState({ accessToken: undefined });

      return Promise.reject(refreshError);
    }
  },
);
