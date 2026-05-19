import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type AuthStore = {
  accessToken: string;
  setAccessToken: (accessToken: string) => void;
  clearAccessToken: () => void;
};

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      accessToken: "",
      setAccessToken: (accessToken: string) => set({ accessToken }),
      clearAccessToken: () => set({ accessToken: "" }),
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ accessToken: state.accessToken }),
    },
  ),
);
