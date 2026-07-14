import { api } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Navigate } from "react-router";
import { ErrorPage } from "./ErrorPage";
import { RouterLoading } from "./RouterLoading";
import { useAuthStore } from "@/store/auth";

export function AuthRouter({ children }: { children: React.ReactNode }) {
  const setIsAuth = useAuthStore((state) => state.setAuthenticated);
  const { isPending, isError, error } = useQuery({
    queryKey: ["auth-me"],
    queryFn: async () => {
      const { data } = await api.get("/auth/me");
      if (data.user) {
        setIsAuth(true);
      }
      return data;
    },
    retry: false,
  });

  if (isPending) {
    return <RouterLoading />;
  }

  if (isError) {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      return <Navigate to="/login" replace />;
    } else {
      return <ErrorPage />;
    }
  }

  return <>{children}</>;
}
