import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { Pie, PieChart } from "recharts";
import { READING_STATUS_LABEL_MAP } from "../ownedBook/model/ownedBookSchema";
import { getReadingStatusCount } from "./API/chartAPI";

const chartConfig = {
  count: {
    label: "권수",
  },
  OWNED: {
    label: READING_STATUS_LABEL_MAP.OWNED,
    color: "var(--color-chart-1)",
  },
  READING: {
    label: READING_STATUS_LABEL_MAP.READING,
    color: "var(--color-chart-2)",
  },
  COMPLETED: {
    label: READING_STATUS_LABEL_MAP.COMPLETED,
    color: "var(--color-chart-3)",
  },
  ABANDONED: {
    label: READING_STATUS_LABEL_MAP.ABANDONED,
    color: "var(--color-chart-4)",
  },
  ABANDONED_READING: {
    label: READING_STATUS_LABEL_MAP.ABANDONED_READING,
    color: "var(--color-chart-5)",
  },
} satisfies ChartConfig;

export function ReadingStateChart() {
  const { data, isError, isLoading } = useQuery({
    queryKey: ["readingStatusCard"],
    queryFn: getReadingStatusCount,
    select: ({ data, empty }) => {
      const chartData = data.map((item) => ({
        ...item,
        fill: `var(--color-${item.readingStatus})`,
      }));
      return { chartData, empty };
    },
  });

  return (
    <Card className="min-w-0 w-full">
      <CardHeader>
        <CardTitle>독서 상태 통계</CardTitle>
      </CardHeader>
      <CardContent className="min-w-0">
        {isLoading ? (
          <div>불러오는 중...</div>
        ) : isError || !data ? (
          <div>독서 상태 데이터를 불러오지 못했습니다.</div>
        ) : data.empty ? (
          <div>표시할 독서 상태 데이터가 없습니다.</div>
        ) : (
          <ChartContainer
            config={chartConfig}
            initialDimension={{ width: 280, height: 288 }}
            className="h-72 min-h-72 w-full min-w-0 aspect-auto sm:h-80 sm:min-h-80"
          >
            <PieChart>
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Pie
                innerRadius={45}
                data={data.chartData}
                dataKey="count"
                nameKey="readingStatus"
              />
              <ChartLegend
                content={
                  <ChartLegendContent
                    nameKey="readingStatus"
                    className="flex-wrap gap-x-3 gap-y-2 px-2 text-[11px] sm:text-xs"
                  />
                }
              />
            </PieChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
}
