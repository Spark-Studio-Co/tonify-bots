"use client";

import ProfileCard from "@/entities/profile/profile-tab";
import ReferralCard from "@/entities/referral/referral-card";
import ActionButton from "@/shared/ui/action-button/action-button";
import AnnouncementsList from "@/widgets/announcements-list/announcements-list";
import { PlusCircle, Wallet } from "lucide-react";
import { useState } from "react";

import announcement from "@/assets/announcement.png";
import { useModalBalanceStore } from "@/entities/balance/model/use-modal-balance-store";

export const HomeBlock = () => {
  const [adsFilter, setAdsFilter] = useState("all");
  const { openModal } = useModalBalanceStore();

  const ads = [
    {
      id: 1,
      title: "Продажа автомобиля Nissan",
      image: announcement,
      status: "open",
      date: "12.03.2023",
    },
    {
      id: 2,
      title: "Продажа автомобиля Toyota",
      image: announcement,
      status: "closed",
      date: "10.03.2023",
    },
    {
      id: 3,
      title: "Продажа автомобиля Toyota",
      image: announcement,
      status: "open",
      date: "08.03.2023",
    },
    {
      id: 4,
      title: "Продажа автомобиля Toyota",
      image: announcement,
      status: "open",
      date: "05.03.2023",
    },
    {
      id: 5,
      title: "Продажа автомобиля Toyota",
      image: announcement,
      status: "open",
      date: "05.03.2023",
    },
    {
      id: 6,
      title: "Продажа автомобиля Toyota",
      image: announcement,
      status: "open",
      date: "05.03.2023",
    },
  ];

  const handleCreateAd = () => {
    console.log("Create ad clicked");
  };

  const handleManageBalance = () => {
    openModal();
    console.log("Manage balance clicked");
  };

  return (
    <div className="flex flex-col min-h-screen ">
      <main className="flex-1 container mx-auto  max-w-md">
        <ProfileCard />
        <div className="flex gap-3 mt-4">
          <ActionButton
            icon={<PlusCircle size={18} />}
            label="Создать объявление"
            onClick={handleCreateAd}
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
        <AnnouncementsList
          ads={ads as any}
          filter={adsFilter}
          onFilterChange={setAdsFilter}
        />
      </main>
    </div>
  );
};
