import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FormInputField } from "@/components/customUi/FormInputField";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import z from "zod";
import { registerUser } from "./api/authAPI";
import { toast } from "@/lib/toast";

const registerSchema = z.object({
  userId: z.string().min(1, "아이디를 입력해주세요"),
  nickname: z.string().min(1, "닉네임을 입력해주세요"),
  password: z.string().min(1, "비밀번호를 입력해주세요"),
});

export type RegisterFormType = z.infer<typeof registerSchema>;

const init = {
  userId: "",
  nickname: "",
  password: "",
};

export function Register() {
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    setError,
    formState: { isSubmitting },
  } = useForm<RegisterFormType>({
    defaultValues: init,
    resolver: zodResolver(registerSchema),
  });

  const handleRegister = async (formData: RegisterFormType) => {
    try {
      await registerUser(formData);
      toast.success("회원가입이 완료되었습니다.");
      navigate("/login");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message =
          error.response?.data.message || "회원가입 중 오류가 발생했습니다.";
        setError("root", { message });
        toast.error(message);
      }
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-4 py-10">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,var(--color-primary),transparent_28%)] opacity-15" />
      <Card className="relative w-full max-w-sm border-primary/15 shadow-xl shadow-primary/5">
        <CardHeader>
          <CardTitle className="text-xl font-bold">회원가입</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="grid gap-4" onSubmit={handleSubmit(handleRegister)}>
            <FormInputField control={control} label="아이디" name="userId" />
            <FormInputField control={control} label="닉네임" name="nickname" />
            <FormInputField
              control={control}
              type="password"
              label="비밀번호"
              name="password"
            />
          </form>
        </CardContent>
        <CardFooter className="flex flex-col gap-2">
          <Button
            className="w-full"
            onClick={handleSubmit(handleRegister)}
            disabled={isSubmitting}
          >
            {isSubmitting ? "가입 중..." : "회원가입"}
          </Button>
          <Button
            variant="ghost"
            className="w-full"
            onClick={() => navigate("/login")}
          >
            로그인으로 돌아가기
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
