import { useThemeStore } from "@/store/themeStore";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";

export function ThemeToggle() {
  const isDark = useThemeStore((state) => state.isDark);
  const toggleTheme = useThemeStore((state) => state.toggleTheme);

  return (
    <div className="flex min-h-9 items-center gap-2 rounded-lg border border-border/70 bg-card/70 px-2.5">
      <Switch
        id="dark-mode"
        checked={isDark}
        onClick={toggleTheme}
        aria-label="다크모드 전환"
      />
      <Label htmlFor="dark-mode" className="hidden text-sm sm:inline">
        다크모드
      </Label>
    </div>
  );
}
