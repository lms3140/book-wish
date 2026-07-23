import { useThemeStore } from "@/store/themeStore";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";

export function ThemeToggle() {
  const isDark = useThemeStore((state) => state.isDark);
  const toggleTheme = useThemeStore((state) => state.toggleTheme);

  return (
    <div className="flex items-center space-x-2">
      <Switch id="dark-mode" checked={isDark} onClick={toggleTheme} />
      <Label htmlFor="dark-mode">다크모드</Label>
    </div>
  );
}
