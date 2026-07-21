import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { getOwnedBookCount } from "./API/chartAPI";

export function TotalBookCard() {
  const { data, isError, isLoading } = useQuery({
    queryKey: ["totalOwnedBookCount"],
    queryFn: getOwnedBookCount,
    select: (data) => data.data.count,
  });

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>등록한 전체 도서</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="text-muted-foreground">불러오는 중...</div>
        ) : isError || data == null ? (
          <div className="text-muted-foreground">
            전체 도서 수를 불러오지 못했습니다.
          </div>
        ) : (
          <div className="flex items-end gap-2">
            <span className="text-4xl font-semibold leading-none tabular-nums">
              {data}
            </span>
            <span className="text-sm text-muted-foreground">권</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
