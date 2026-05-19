import { api } from "@/lib/api";

export const logout = async () => {
  try {
    await api.post("/auth/logout");
  } catch (e) {
    console.log(e);
  }
};
