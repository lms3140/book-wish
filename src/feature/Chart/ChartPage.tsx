import { PageContainer, PageContent } from "@/components/layout/Page";
import { GenreChart } from "./GenreChart";
import { ReadingStateChart } from "./ReadingStateChart";
import { TotalBookCard } from "./TotalBookCard";

export function ChartPage() {
  return (
    <PageContainer>
      <PageContent className="grid gap-2 justify-items-center space-y-0 grid-cols-1 sm:max-md:grid-cols-2 md:grid-cols-2">
        <TotalBookCard />
        <ReadingStateChart />
        <GenreChart />
      </PageContent>
    </PageContainer>
  );
}
