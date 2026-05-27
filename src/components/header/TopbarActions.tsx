import { logout } from "@/feature/Auth/api/authAPI";
import { Button } from "../ui/button";
import { ThemeToggle } from "../ui/ThemeToggle";
import { useNavigate } from "react-router";

export function TopbarActions() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    const isConfirmed = window.confirm("로그아웃 하시겠습니까?");
    if (!isConfirmed) return;
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
