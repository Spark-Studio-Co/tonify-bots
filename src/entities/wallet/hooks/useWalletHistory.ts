import { useQuery } from "@tanstack/react-query"
import { getWalletHistory } from "@/entities/wallet/api/get-wallet-history"

export const useWalletHistory = () => {
  return useQuery({
    queryKey: ["wallet", "history"],
    queryFn: getWalletHistory,
  })
}
