import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bar, BarChart, XAxis, YAxis } from "recharts";
import { getGenreCount } from "./API/chartAPI";

export function GenreChart() {
  const [showAll, setShowAll] = useState(false);
  const { data, isError, isLoading } = useQuery({
    queryKey: ["ownedBookGenreCounts"],
    queryFn: getGenreCount,
    select: ({ data, empty }) => {
      const chartConfig: ChartConfig = {
        count: {
          label: "권수",
        },
      };

      const chartData = [...data]
        .sort((a, b) => b.count - a.count)
        .map((item, index) => ({
          count: item.count,
          fill: `var(--chart-${(index % 5) + 1})`,
          genre: item.genre,
        }));
      return {
        chartData,
        chartConfig,
        empty,
      };
    },
  });
  const visibleChartData = showAll
    ? data?.chartData
    : data?.chartData.slice(0, 15);

  return (
    <Card className="min-w-0 w-full">
      <CardHeader>
        <CardTitle>장르별 도서 보유 개수</CardTitle>
        {data && data.chartData.length > 15 && (
          <CardAction>
            <Button
              type="button"
              variant="outline"
              onClick={() => setShowAll((current) => !current)}
            >
              {showAll ? "Top 15 보기" : "전체 보기"}
            </Button>
          </CardAction>
        )}
      </CardHeader>

      <CardContent className="min-w-0">
        {isLoading ? (
          <div>불러오는 중...</div>
        ) : isError || !data ? (
          <div>장르 데이터를 불러오지 못했습니다.</div>
        ) : data.empty ? (
          <div>표시할 장르 데이터가 없습니다.</div>
        ) : (
          <ChartContainer
            config={data.chartConfig}
            initialDimension={{ width: 280, height: 320 }}
            className="h-80 min-h-80 w-full min-w-0 aspect-auto sm:h-96 sm:min-h-96"
          >
            <BarChart
              data={visibleChartData}
              margin={{ top: 8, right: 8, bottom: 8, left: -20 }}
            >
              <XAxis dataKey="genre" minTickGap={12} tickMargin={8} />
              <YAxis allowDecimals={false} domain={[0, "auto"]} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="count" />
            </BarChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
}
