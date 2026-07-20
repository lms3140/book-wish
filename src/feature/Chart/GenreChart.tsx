import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { getGenreCount } from "../ownedBook/api/ownedBooks";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
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
import { Bar, BarChart, Pie, PieChart, XAxis, YAxis } from "recharts";

const CHART_COLORS = [
  "var(--color-chart-1)",
  "var(--color-chart-2)",
  "var(--color-chart-3)",
  "var(--color-chart-4)",
  "var(--color-chart-5)",
];

export function GenreChart() {
  const [chartMode, setChartMode] = useState<"pie" | "bar">("pie");
  const { data, isError, isLoading } = useQuery({
    queryKey: ["ownedBookGenreCounts"],
    queryFn: getGenreCount,
    select: ({ data }) => {
      const chartConfig: ChartConfig = {
        count: {
          label: "권수",
        },
      };

      const chartData = data.map((item, index) => {
        const key = `genre-${index}`;

        chartConfig[key] = {
          label: item.genre,
          color: CHART_COLORS[index % CHART_COLORS.length],
        };

        return {
          key,
          count: item.count,
          fill: `var(--color-${key})`,
          genre: item.genre,
        };
      });
      return {
        chartData,
        chartConfig,
      };
    },
  });
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>장르별 도서 보유 개수</CardTitle>
        <CardAction>
          <Button
            onClick={() =>
              setChartMode((mode) => (mode === "pie" ? "bar" : "pie"))
            }
          >
            {chartMode === "pie" ? "막대 차트" : "원형 차트"}
          </Button>
        </CardAction>
      </CardHeader>

      <CardContent>
        {isLoading ? (
          <div>불러오는 중...</div>
        ) : isError || !data ? (
          <div>장르 데이터를 불러오지 못했습니다.</div>
        ) : chartMode === "pie" ? (
          <ChartContainer config={data.chartConfig}>
            <PieChart>
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Pie
                innerRadius={45}
                data={data.chartData}
                dataKey="count"
                nameKey="key"
              />
              <ChartLegend content={<ChartLegendContent />} />
            </PieChart>
          </ChartContainer>
        ) : (
          <ChartContainer config={data.chartConfig}>
            <BarChart data={data.chartData}>
              <XAxis dataKey="genre" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="count" fill="var(--chart-1)" />
            </BarChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
}
