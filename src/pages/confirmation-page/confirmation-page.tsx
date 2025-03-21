import { Layout } from "@/shared/layouts/layout";
import ConfirmationCodeBlock from "./blocks/confirmation-block";

export const ConfirmationCodePage = () => {
  return (
    <Layout isAuth={false}>
      <ConfirmationCodeBlock />
    </Layout>
  );
};
