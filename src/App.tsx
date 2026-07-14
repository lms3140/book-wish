import { ToastContainer } from "react-toastify";
import { TopbarActions } from "./components/header/TopbarActions";
import { useThemeStore } from "./store/themeStore";

import { Outlet } from "react-router";
import { BookNavigation } from "./components/header/BookNavigation";

function App() {
  const isDark = useThemeStore((state) => state.isDark);
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="px-4 py-4 flex justify-end">
        <TopbarActions />
      </header>

      <BookNavigation />
      <Outlet />
      <ToastContainer theme={isDark ? "dark" : "light"} />
    </div>
  );
}

export default App;
