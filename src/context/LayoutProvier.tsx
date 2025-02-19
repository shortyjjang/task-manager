import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
export default function LayoutProvier({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = useSelector((state: any) => state.user);
  const navigate = useNavigate();
  useEffect(() => {
    if (!user.username) {
      navigate("/login");
    }
  }, [navigate, user.username]);
  return <div className="min-h-screen flex flex-col">{children}</div>;
}
