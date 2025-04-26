import { Layout } from "../../shared/layouts/layout"
import { OnboardingStart } from "./blocks/onboarding-start"

export const IntroPage = () => {
  return (
    <Layout isAuth={false}>
      <OnboardingStart />
    </Layout>
  )
}
