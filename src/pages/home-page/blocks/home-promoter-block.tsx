import ReferralCard from "@/entities/referral/referral-card";
import ActionButton from "@/shared/ui/action-button/action-button";
import { PlusCircle, Wallet } from "lucide-react";
import { useModalBalanceStore } from "@/entities/balance/store/use-modal-balance-store";
import PromoterProfileCard from "@/entities/profile/ui/promoter-profile-tab";
import { useNavigate } from "react-router-dom";
import AnnouncementsList from "@/widgets/announcements-list/announcements-list";

export const HomePromoterBlock = () => {
  const navigate = useNavigate();
  const { openModal } = useModalBalanceStore();

  const handleManageBalance = () => {
    openModal();
    console.log("Manage balance clicked");
  };

  return (
    <div className="w-full flex flex-col min-h-screen ">
      <main className="flex-1 container mx-auto  max-w-md">
        <PromoterProfileCard />
        <div className="flex gap-3 mt-4">
          <ActionButton
            icon={<PlusCircle size={18} />}
            label="Создать объявление"
            onClick={() => navigate("/add-announcement")}
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
        <AnnouncementsList />
      </main>
    </div>
  );
};
