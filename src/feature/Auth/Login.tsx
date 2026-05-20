import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FormInputField } from "@/components/ui/FormInputField";
import { api } from "@/lib/api";
import { useAuthStore } from "@/store/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
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
        throw new Error(error.response?.data.message || "오류가 발생했습니다.", {
          cause: error,
        });
      }
    }
  };
  return (
    <Card className="max-w-sm mx-auto">
      <CardHeader>
        <CardTitle>로그인</CardTitle>
      </CardHeader>
      <CardContent>
        <form className="grid gap-2">
          <FormInputField control={control} label="아이디" name="userId" />
          <FormInputField control={control} label="비밀번호" name="password" />
          <p className="text-destructive text-xs">{errors.root?.message}</p>
        </form>
      </CardContent>
      <CardFooter>
        <Button className="w-full" onClick={handleSubmit(handleLogin)}>
          로그인
        </Button>
      </CardFooter>
    </Card>
  );
}
