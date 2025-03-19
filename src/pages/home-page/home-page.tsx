import BalanceModal from "@/entities/balance/balance-management-popup";
import { Layout } from "@/shared/layouts/layout";
import { useProfileStore } from "@/entities/profile/model/use-profile-store";
import { HomePromoterBlock } from "./blocks/home-promoter-block";
import { HomeChatOwnerBlock } from "./blocks/home-chat-owner-block";

export const HomePage = () => {
  const { isChatOwner, isPromoter } = useProfileStore();

  return (
    <Layout>
      {isChatOwner && <HomeChatOwnerBlock />}
      {isPromoter && <HomePromoterBlock />}
      <BalanceModal />
    </Layout>
  );
};
