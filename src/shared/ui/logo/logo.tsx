import logo from "@/assets/tonify.svg";
import { useNavigate } from "react-router-dom";

export const Logo = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center gap-2" onClick={() => navigate("/")}>
      <img src={logo} alt="Tonify" />
      <span className="text-main text-[21px] font-bold">Tonify</span>
    </div>
  );
};
