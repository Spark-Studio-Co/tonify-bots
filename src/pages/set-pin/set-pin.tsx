import { Layout } from "@/shared/layouts/layout"
import SetPinBlock from "@/pages/set-pin/blocks/set-pin-block.tsx"

export const SetPin = () => {
  return (
    <Layout isAuth={false}>
      <SetPinBlock />
    </Layout>
  )
}
