import { api } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Navigate } from "react-router";
import { ErrorPage } from "./ErrorPage";
import { RouterLoading } from "./RouterLoading";

export function AuthRouter({ children }: { children: React.ReactNode }) {
  const { isPending, isError, error } = useQuery({
    queryKey: ["auth-me"],
    queryFn: async () => {
      const { data } = await api.get("/auth/me");
      return data;
    },
    retry: false,
  });

  if (isPending) {
    return <RouterLoading />;
  }

  if (isError) {
    if (axios.isAxiosError(error) && error.response?.status === 400) {
      return <Navigate to="/login" replace />;
    } else {
      return <ErrorPage />;
    }
  }

  return <>{children}</>;
}
