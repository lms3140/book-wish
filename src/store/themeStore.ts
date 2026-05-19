import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type ThemeStore = {
  isDark: boolean;
  setIsDark: (isDark: boolean) => void;
  toggleTheme: () => void;
};

const applyDarkClass = (isDark: boolean) => {
  document.documentElement.classList.toggle("dark", isDark);
};

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set) => ({
      isDark: false,

      setIsDark: (isDark: boolean) => {
        applyDarkClass(isDark);
        set({ isDark });
      },

      toggleTheme: () => {
        set((state) => {
          const isDark = !state.isDark;
          applyDarkClass(isDark);

          return { isDark };
        });
      },
    }),
    {
      name: "theme-storage",
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        if (state) {
          applyDarkClass(state.isDark);
        }
      },
      partialize: (state) => ({ isDark: state.isDark }),
    },
  ),
);
