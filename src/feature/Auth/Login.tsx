import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FormInputField } from "@/components/customUi/FormInputField";
import { api } from "@/lib/api";
import { useAuthStore } from "@/store/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import z from "zod";

const loginSchema = z.object({
  userId: z.string().min(1, "아이디를 입력해주세요"),
  password: z.string().min(1, "비밀번호를 입력해주세요"),
});

export type LoginFormType = z.infer<typeof loginSchema>;

const init = {
  userId: "",
  password: "",
};

export function Login() {
  const navigate = useNavigate();
  const setAuthenticated = useAuthStore((state) => state.setAuthenticated);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);
  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<LoginFormType>({
    defaultValues: init,
    resolver: zodResolver(loginSchema),
  });

  const handleLogin = async (formData: LoginFormType) => {
    try {
      await api.post("/auth/login", formData);
      setAuthenticated(true);
      navigate("/");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError("root", {
          message: error.response?.data.message,
        });
        throw new Error(
          error.response?.data.message || "오류가 발생했습니다.",
          {
            cause: error,
          },
        );
      }
    }
  };
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-4 py-10">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,var(--color-primary),transparent_28%)] opacity-15" />
      <div className="relative w-full max-w-sm">
        <form onSubmit={handleSubmit(handleLogin)}>
          <Card className="w-full border-primary/15 shadow-xl shadow-primary/5">
            <CardHeader>
              <div className="mb-2 flex size-10 items-center justify-center rounded-xl bg-primary text-lg font-black text-primary-foreground">
                B
              </div>
              <CardTitle className="text-xl font-bold">로그인</CardTitle>
              <CardDescription className="text-sm">
                Book Wish에서 나만의 서재를 관리하세요.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormInputField control={control} label="아이디" name="userId" />
              <FormInputField
                control={control}
                type="password"
                label="비밀번호"
                name="password"
              />
              <p className="text-destructive text-xs">
                {errors.root?.message
                  ? "아이디 또는 비밀번호가 일치하지 않습니다."
                  : null}
              </p>
            </CardContent>
            <CardFooter className="flex flex-col gap-2 pt-1">
              <Button className="h-10 w-full text-sm" type="submit">
                로그인
              </Button>
            </CardFooter>
          </Card>
        </form>
      </div>
    </div>
  );
}
