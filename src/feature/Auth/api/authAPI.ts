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
