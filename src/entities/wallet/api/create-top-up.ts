import { apiClient } from "@/shared/api/apiClient"

export const createTopUp = async (data: {
  userId: number
  amount: number
}) => {
  const res = await apiClient.post("/wallet/top-up", data)
  return res.data
}
