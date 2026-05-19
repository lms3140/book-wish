import { Button } from "@/components/ui/button";
import { useThemeStore } from "@/store/themeStore";

export function ThemeToggle() {
  const isDark = useThemeStore((state) => state.isDark);
  const toggleTheme = useThemeStore((state) => state.toggleTheme);

  return (
    <Button onClick={toggleTheme}>
      {isDark ? "라이트 모드" : "다크 모드"}
    </Button>
  );
}
