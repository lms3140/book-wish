import { PageContainer, PageContent } from "@/components/layout/Page";
import { OwnedBookSidePanel } from "./OwnedBookSidePanel";
import { OwnedBookTable } from "./OwnedBookTable";

export function OwnedBookPage() {
  return (
    <PageContainer>
      <PageContent>
        <div data-slot="page-header">
          <p data-slot="page-eyebrow">MY LIBRARY</p>
          <h1 data-slot="page-title">나의 서재</h1>
          <p data-slot="page-description">
            소장 도서와 독서 상태를 한곳에서 정리해 보세요.
          </p>
        </div>
        <OwnedBookSidePanel />
        <OwnedBookTable />
      </PageContent>
    </PageContainer>
  );
}
