import { Link } from "lucide-react";

export function ChatHeader() {
  return (
    <div className="flex justify-center">
      <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center shadow-md">
        <Link size={40} style={{ color: "var(--color-main, #627ffe)" }} />
      </div>
    </div>
  );
}
