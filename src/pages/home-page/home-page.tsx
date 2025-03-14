import BalanceModal from "@/entities/balance/balance-management-popup";
import { Layout } from "@/shared/layouts/layout";
import { HomeBlock } from "./blocks/home-block";

export const HomePage = () => {
  return (
    <Layout>
      <HomeBlock />
      <BalanceModal />
    </Layout>
  );
};
