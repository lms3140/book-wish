import { PageContainer, PageContent } from "@/components/layout/Page";
import { OwnedBookSidePanel } from "./OwnedBookSidePanel";
import { OwnedBookTable } from "./OwnedBookTable";

export function OwnedBookPage() {
  return (
    <PageContainer>
      <PageContent>
        <OwnedBookSidePanel />
        <OwnedBookTable />
      </PageContent>
    </PageContainer>
  );
}
