import { ToastContainer } from "react-toastify";
import { TopbarActions } from "./components/header/TopbarActions";
import { useThemeStore } from "./store/themeStore";

import { Outlet } from "react-router";
import { Link } from "react-router";
import { BookNavigation } from "./components/header/BookNavigation";
import { BookOpenText } from "lucide-react";

function App() {
  const isDark = useThemeStore((state) => state.isDark);
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b border-border/70 bg-background/90 backdrop-blur-xl">
        <div className="mx-auto grid h-16 w-full max-w-7xl grid-cols-[1fr_auto] items-center gap-3 px-4 sm:px-6 md:grid-cols-[1fr_auto_1fr] lg:px-8">
          <Link
            to="/"
            className="flex min-w-0 items-center gap-2.5 justify-self-start"
            aria-label="Book Wish 홈"
          >
            <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm shadow-primary/25">
              <BookOpenText className="size-5" aria-hidden="true" />
            </span>
            <span className="truncate text-base font-bold tracking-tight sm:text-lg">
              Book Wish
            </span>
          </Link>

          <div className="hidden md:block">
            <BookNavigation />
          </div>

          <div className="justify-self-end">
            <TopbarActions />
          </div>
        </div>

        <div className="flex h-12 items-center justify-center border-t border-border/60 px-4 md:hidden">
          <BookNavigation />
        </div>
      </header>
      <Outlet />
      <ToastContainer theme={isDark ? "dark" : "light"} />
    </div>
  );
}

export default App;
