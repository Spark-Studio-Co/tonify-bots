import { Logo } from "@/shared/ui/logo/logo";
import { Menu } from "lucide-react";
import { useMenuStore } from "../menu/model/use-menu-store";

export const Header = () => {
  const { openMenu } = useMenuStore();

  return (
    <div className="w-full flex items-center justify-between">
      <Logo />
      <button
        onClick={openMenu}
        className="p-2 rounded-full hover:bg-gray-100 transition-colors"
        aria-label="Menu"
      >
        <Menu size={20} style={{ color: "var(--color-secondary)" }} />
      </button>
    </div>
  );
};
