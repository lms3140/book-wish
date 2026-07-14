import { PageContainer, PageContent } from "@/components/layout/Page";
import { BookSidePanel } from "./BookSidePanel";
import { BookTable } from "./BookTable";

export function WishBookPage() {
  return (
    <PageContainer>
      <PageContent>
        <BookSidePanel />
        <BookTable />
      </PageContent>
    </PageContainer>
  );
}
