"use client";

import { useModalBalanceStore } from "@/entities/balance/model/use-modal-balance-store";
import ProfileCard from "@/entities/profile/profile-tab";
import StatsChart from "@/entities/stats/stats-chart";
import StatsGrid from "@/entities/stats/ton-earnings";
import StatsMetrics from "@/entities/stats/stats-metrics";
import ActionButton from "@/shared/ui/action-button/action-button";
import { PlusCircle, Wallet } from "lucide-react";

// Generate mock data for views chart
const generateMockViewsData = () => {
  const data = [];
  const today = new Date();
  for (let i = 30; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    data.push({
      date: date.toISOString().split("T")[0],
      views: Math.floor(Math.random() * 100) + 50,
    });
  }
  return data;
};

// Hardcoded stats data
const stats = {
  tonEarnings: [1, 1, 1, 1],
  viewsData: generateMockViewsData(),
};

// Hardcoded metrics data
const metrics = [
  { label: "Кол-во заказов", value: 1200 },
  { label: "Кол-во юзеров", value: 1200 },
];

export const ProfileBlock = () => {
  const { openModal } = useModalBalanceStore();

  const handleCreateAd = () => {
    console.log("Create ad clicked");
  };

  const handleManageBalance = () => {
    openModal();
    console.log("Manage balance clicked");
  };

  return (
    <div className="min-h-screen pb-20">
      <div className="container mx-auto  max-w-md space-y-6">
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

        {/* TON Earnings Grid */}
        <StatsGrid
          title="Количество заработанных TON"
          values={stats.tonEarnings}
        />

        {/* Metrics */}
        <StatsMetrics metrics={metrics} />

        <StatsChart data={stats.viewsData} />
      </div>
    </div>
  );
};
