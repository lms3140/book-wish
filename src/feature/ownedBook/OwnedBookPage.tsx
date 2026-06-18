import { OwnedBookSidePanel } from "./OwnedBookSidePanel";
import { OwnedBookTable } from "./OwnedBookTable";

export function OwnedBookPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-6 flex justify-center gap-2">
      <div className="w-2xl grow-2">
        <OwnedBookTable />
      </div>
      <OwnedBookSidePanel />
    </div>
  );
}
