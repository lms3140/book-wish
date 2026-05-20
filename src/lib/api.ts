import axios, { type InternalAxiosRequestConfig } from "axios";
import { useAuthStore } from "@/store/auth";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
});

type RetryRequestConfig = InternalAxiosRequestConfig & {
  _retry?: boolean;
};

let refreshPromise: Promise<void> | null = null;

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (!axios.isAxiosError(error)) {
      return Promise.reject(error);
    }

    const originalRequest = error.config as RetryRequestConfig | undefined;

    if (!originalRequest || error.response?.status !== 401) {
      return Promise.reject(error);
    }

    // refresh 요청 자체가 401인 경우 (로그아웃 처리 등)
    if (originalRequest.url === "/auth/refresh") {
      useAuthStore.getState().setAuthenticated(false);
      return Promise.reject(error);
    }

    // 이미 재시도한 요청인 경우
    if (originalRequest._retry) {
      useAuthStore.getState().setAuthenticated(false);
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    try {
      if (!refreshPromise) {
        refreshPromise = api
          .post("/auth/refresh")
          .then(() => {}) // 쿠키 기반이므로 토큰을 직접 다루지 않음
          .finally(() => {
            refreshPromise = null;
          });
      }

      await refreshPromise;
      return api(originalRequest);
    } catch (refreshError) {
      useAuthStore.getState().setAuthenticated(false);
      return Promise.reject(refreshError);
    }
  },
);
