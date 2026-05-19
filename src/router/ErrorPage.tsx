import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useQueryClient } from "@tanstack/react-query";
import { Home, RotateCcw } from "lucide-react";
import { isRouteErrorResponse, Link, useRouteError } from "react-router";

export function ErrorPage() {
  const query = useQueryClient();
  const error = useRouteError();

  const title = isRouteErrorResponse(error)
    ? `${error.status} ${error.statusText}`
    : "페이지를 불러오지 못했습니다";

  const description = isRouteErrorResponse(error)
    ? (error.data?.message ?? "요청한 페이지에서 문제가 발생했습니다.")
    : error instanceof Error
      ? error.message
      : "잠시 후 다시 시도해주세요.";

  return (
    <main className="grid min-h-screen place-items-center bg-background px-6 text-foreground">
      <Card className="w-full max-w-md py-8">
        <CardHeader className="items-center gap-3 px-6 text-center">
          <CardTitle className="text-xl font-semibold">{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent className="text-center text-xs text-muted-foreground">
          <p>문제가 계속되면 처음 화면으로 돌아가 다시 시작해주세요.</p>
        </CardContent>
        <CardFooter className="justify-center gap-2 px-6">
          <Button
            variant="outline"
            onClick={() => {
              query.invalidateQueries({
                queryKey: ["auth-me"],
              });
            }}
          >
            <RotateCcw aria-hidden="true" />
            다시 시도
          </Button>
        </CardFooter>
      </Card>
    </main>
  );
}
