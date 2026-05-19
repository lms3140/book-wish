import { logout } from "@/feature/Auth/api/authAPI";
import { Button } from "../ui/button";
import { ThemeToggle } from "../ui/ThemeToggle";
import { useNavigate } from "react-router";

export function TopbarActions() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };
  return (
    <div>
      <ThemeToggle />
      <Button onClick={handleLogout}>로그아웃</Button>
    </div>
  );
}
