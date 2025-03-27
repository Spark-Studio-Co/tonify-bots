"use client";

import avatarFallback from "@/assets/avatar.png";
import { BalanceTab } from "../../balance/balance-tab";
import { ArrowLeftRight } from "lucide-react";
import { useProfileStore } from "../model/use-profile-store";
import { useTelegram } from "@/shared/layouts/telegram-provider";

export default function PromoterProfileCard() {
  const { setIsChatOwner } = useProfileStore();
  const { user } = useTelegram();

  const name =
    user?.first_name && user?.last_name
      ? `${user.first_name} ${user.last_name}`
      : user?.first_name || user?.username || "Пользователь";

  const avatar = `https://t.me/i/userpic/320/${user?.username}.jpg`;

  return (
    <div className="bg-white rounded-xl shadow-sm p-4 flex items-center gap-4">
      <div className="relative">
        <img
          src={user?.username ? avatar : avatarFallback}
          alt={name}
          className="w-16 h-16 rounded-full object-cover"
        />
      </div>

      <div className="flex flex-row justify-between w-full">
        <div className="flex flex-col items-start">
          <h2 className="font-bold text-dark text-lg">{name}</h2>
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => setIsChatOwner()}
          >
            <p className="text-sm text-main">Рекламодатель</p>
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
