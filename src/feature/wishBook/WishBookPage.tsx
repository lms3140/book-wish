import { BookSidePanel } from "./BookSidePanel";
import { BookTable } from "./BookTable";

export function WishBookPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-6 flex justify-center gap-2">
      <div className="w-2xl grow-2">
        <BookTable />
      </div>
      <BookSidePanel />
    </div>
  );
}
