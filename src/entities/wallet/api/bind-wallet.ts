import { apiClient } from "@/shared/api/apiClient"

export const bindWallet = async (data: {
  userId: number
  walletAddress: string
}) => {
  const res = await apiClient.post("/wallet/address", data)
  return res.data
}
