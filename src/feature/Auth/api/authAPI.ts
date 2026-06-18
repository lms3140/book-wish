import { api } from "@/lib/api";
import { useAuthStore } from "@/store/auth";

export const logout = async () => {
  try {
    await api.post("/auth/logout");
    useAuthStore.getState().setAuthenticated(false);
  } catch {
    // 에러 발생 시 처리 로직 필요 (현재는 무시)
  }
};

export type RegisterParams = {
  userId: string;
  nickname: string;
  password: string;
};

export const registerUser = async (params: RegisterParams) => {
  const { data } = await api.post("/auth/register", params);
  return data;
};
