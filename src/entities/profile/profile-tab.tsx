import avatar from "@/assets/avatar.png";
import { BalanceTab } from "../balance/balance-tab";
import { ArrowLeftRight } from "lucide-react";

export default function ProfileCard() {
  const user = {
    avatar: avatar,
    name: "Иван Иванов",
    role: "Рекламодатель",
    balance: 100.0,
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-4 flex items-center gap-4">
      <div className="relative">
        <img
          src={user.avatar}
          alt={user.name}
          className="w-16 max-h-16 text-main rounded-full object-cover "
        />
      </div>
      <div className="flex flex-row justify-between w-full">
        <div className="flex flex-col items-start">
          <h2 className="font-bold text-dark text-lg">{user.name}</h2>
          <div className="flex items-center gap-2">
            <p className="text-sm text-main">{user.role}</p>
            <ArrowLeftRight size={12} color="#7bc394" />
          </div>
        </div>
        <div className="mt-1 flex items-center">
          <BalanceTab />
        </div>
      </div>
    </div>
  );
}
