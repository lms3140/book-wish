import { PageContainer, PageContent } from "@/components/layout/Page";
import { GenreChart } from "./GenreChart";
import { ReadingStateChart } from "./ReadingStateChart";
import { TotalBookCard } from "./TotalBookCard";

export function ChartPage() {
  return (
    <PageContainer>
      <PageContent>
        <div data-slot="page-header">
          <p data-slot="page-eyebrow">INSIGHTS</p>
          <h1 data-slot="page-title">독서 통계</h1>
          <p data-slot="page-description">
            지금까지 쌓인 독서 기록을 한눈에 확인하세요.
          </p>
        </div>
        <div className="grid min-w-0 grid-cols-1 gap-5 md:grid-cols-2">
          <TotalBookCard />
          <ReadingStateChart />
          <div className="min-w-0 md:col-span-2">
            <GenreChart />
          </div>
        </div>
      </PageContent>
    </PageContainer>
  );
}
