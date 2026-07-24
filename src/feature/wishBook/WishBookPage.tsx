import { PageContainer, PageContent } from "@/components/layout/Page";
import { BookSidePanel } from "./BookSidePanel";
import { BookTable } from "./BookTable";

export function WishBookPage() {
  return (
    <PageContainer>
      <PageContent>
        <div data-slot="page-header">
          <p data-slot="page-eyebrow">WISH LIST</p>
          <h1 data-slot="page-title">읽고 싶은 책</h1>
          <p data-slot="page-description">
            관심 있는 책을 기록하고 구매 전 목록을 간편하게 관리하세요.
          </p>
        </div>
        <BookSidePanel />
        <BookTable />
      </PageContent>
    </PageContainer>
  );
}
