"use client";

import ReferralCard from "@/entities/referral/referral-card";
import ActionButton from "@/shared/ui/action-button/action-button";
import { PlusCircle, Wallet } from "lucide-react";
import { useModalBalanceStore } from "@/entities/balance/store/use-modal-balance-store";
import ChatsList from "@/widgets/chats-list/chats-list";
import ChatOwnerProfileCard from "@/entities/profile/ui/chat-owner-profile-tab";
import { useNavigate } from "react-router-dom";

export const HomeChatOwnerBlock = () => {
  const { openModal } = useModalBalanceStore();
  const navigate = useNavigate();

  const handleManageBalance = () => {
    openModal();
    console.log("Manage balance clicked");
  };

  return (
    <div className="w-full flex flex-col min-h-screen ">
      <main className="flex-1 container mx-auto  max-w-md">
        <ChatOwnerProfileCard />
        <div className="flex gap-3 mt-4">
          <ActionButton
            icon={<PlusCircle size={18} />}
            label="Создать чат"
            onClick={() => navigate("/add-chat")}
            variant="primary"
          />
          <ActionButton
            icon={<Wallet size={18} />}
            label="Управление балансом"
            onClick={handleManageBalance}
            variant="secondary"
          />
        </div>
        <ReferralCard referralLink="https://testlink.com" />
        <ChatsList />
      </main>
    </div>
  );
};
