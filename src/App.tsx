import { TopbarActions } from "./components/header/TopbarActions";
import { ToastContainer } from "react-toastify";
import { useThemeStore } from "./store/themeStore";

import { Link, Outlet } from "react-router";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "./components/ui/navigation-menu";

function App() {
  const isDark = useThemeStore((state) => state.isDark);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="flex justify-end">
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuLink
                asChild
                className={navigationMenuTriggerStyle()}
              >
                <Link to={"/"}>찜 도서</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink
                asChild
                className={navigationMenuTriggerStyle()}
              >
                <Link to={"/owned"}>소장도서</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
      <header className="px-4 py-4 text-end">
        <TopbarActions />
      </header>
      <Outlet />
      <ToastContainer theme={isDark ? "dark" : "light"} />
    </div>
  );
}

export default App;
