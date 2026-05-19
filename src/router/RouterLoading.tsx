import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LoaderCircle } from "lucide-react";

export function RouterLoading() {
  return (
    <main
      className="grid min-h-screen place-items-center bg-background px-6 text-foreground"
      aria-busy="true"
      aria-live="polite"
    >
      <Card className="w-full max-w-sm  gap-5 py-8">
        <CardHeader className="gap-1 px-6 flex" role="status">
          <div>
            <LoaderCircle
              className="size-10 animate-spin text-primary"
              aria-hidden="true"
            />
          </div>
          <div>
            <CardTitle className="text-xl font-semibold">
              로딩 중입니다
            </CardTitle>
            <CardDescription>
              페이지를 준비하고 있어요. 잠시만 기다려주세요.
            </CardDescription>
          </div>
        </CardHeader>
      </Card>
    </main>
  );
}
