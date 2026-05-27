import { TopbarActions } from "./components/header/TopbarActions";
import { BookTable } from "./feature/book/BookTable";
import { BookSidePanel } from "./feature/BookSidePanel";

function App() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="px-4 py-4 text-end">
        <TopbarActions />
      </header>
      <div className="mx-auto max-w-7xl px-4 py-6 flex justify-center gap-2">
        <div className="w-2xl grow-2">
          <BookTable />
        </div>
        <BookSidePanel />
      </div>
    </div>
  );
}

export default App;
