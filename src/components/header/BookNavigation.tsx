import { BarChart3, BookMarked, Heart } from "lucide-react";
import { Link, useLocation } from "react-router";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "../ui/navigation-menu";
import { navigationMenuTriggerStyle } from "../ui/navigation-menu-variants";
import { cn } from "@/lib/utils";

const navigationItems = [
  { to: "/", label: "찜 도서", icon: Heart },
  { to: "/owned", label: "소장 도서", icon: BookMarked },
  { to: "/chart", label: "통계", icon: BarChart3 },
];

export function BookNavigation() {
  const { pathname } = useLocation();

  return (
    <nav className="flex justify-center" aria-label="주요 메뉴">
      <NavigationMenu>
        <NavigationMenuList className="gap-1">
          {navigationItems.map(({ to, label, icon: Icon }) => {
            const isActive = pathname === to;

            return (
              <NavigationMenuItem key={to}>
                <NavigationMenuLink
                  asChild
                  active={isActive}
                  className={cn(
                    navigationMenuTriggerStyle(),
                    "h-9 gap-1.5 px-2.5 text-sm text-muted-foreground sm:px-3",
                    isActive &&
                      "bg-primary/15 font-semibold text-foreground hover:bg-primary/20",
                  )}
                >
                  <Link to={to} aria-current={isActive ? "page" : undefined}>
                    <Icon className="size-4" aria-hidden="true" />
                    {label}
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            );
          })}
        </NavigationMenuList>
      </NavigationMenu>
    </nav>
  );
}
