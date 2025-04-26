"use client"

import { BalanceTab } from "../../balance/balance-tab"
import { ArrowLeftRight } from "lucide-react"
import { useProfileStore } from "../model/use-profile-store"
import WebApp from "@twa-dev/sdk"

export default function PromoterProfileCard() {
  const { setIsChatOwner } = useProfileStore()

  return (
    <div className="bg-white rounded-xl shadow-sm p-4 flex items-center gap-4">
      <div className="relative">
        <img
          src={WebApp.initDataUnsafe.user?.photo_url || ""}
          alt={WebApp.initDataUnsafe.user?.username || ""}
          className="w-16 h-13 rounded-full object-cover"
        />
      </div>

      <div className="flex flex-row justify-between w-full">
        <div className="flex flex-col items-start">
          <h2 className="font-bold text-dark text-lg">{WebApp.initDataUnsafe.user?.username || ""}</h2>
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setIsChatOwner()}>
            <p className="text-sm text-main">Рекламодатель</p>
            <ArrowLeftRight size={12} color="#7bc394" />
          </div>
        </div>

        <div className="mt-1 flex items-center">
          <BalanceTab />
        </div>
      </div>
    </div>
  )
}
