"use client";

import { useEffect } from "react";
import { Layout } from "@/shared/layouts/layout";
import SettingsBlock from "./blocks/settings-block";
import { useNavStore } from "@/features/bottom-tab/model/use-navigation-store";

export default function SettingsPage() {
  const { setActiveTab } = useNavStore();

  // Set active tab when page loads
  useEffect(() => {
    setActiveTab("settings");
  }, [setActiveTab]);

  return (
    <Layout isAuth={true}>
      <SettingsBlock />
    </Layout>
  );
}
