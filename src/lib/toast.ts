import { toast as toastify, type ToastOptions } from "react-toastify";
import { useThemeStore } from "@/store/themeStore";

const getOptions = (options?: ToastOptions): ToastOptions => {
  const isDark = useThemeStore.getState().isDark;
  return {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: isDark ? "dark" : "light",
    ...options,
  };
};

export const toast = {
  info: (message: string, options?: ToastOptions) => {
    toastify.info(message, getOptions(options));
  },
  error: (message: string, options?: ToastOptions) => {
    toastify.error(message, getOptions(options));
  },
  success: (message: string, options?: ToastOptions) => {
    toastify.success(message, getOptions(options));
  },
};
