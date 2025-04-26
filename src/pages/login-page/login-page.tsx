import { Layout } from "@/shared/layouts/layout"
import LoginBlock from "./blocks/login-block"

export const LoginPage = () => {
  return (
    <Layout isAuth={false}>
      <LoginBlock />
    </Layout>
  )
}
