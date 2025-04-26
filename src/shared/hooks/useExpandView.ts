import { useEffect } from "react"
import WebApp from "@twa-dev/sdk"

export const useExpandView = () => {
  useEffect(() => {
    WebApp.expand()
  }, [])
}
