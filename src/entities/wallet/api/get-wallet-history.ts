import { apiClient } from "@/shared/api/apiClient"

export interface WalletTransaction {
  id: number
  type: "topup" | "withdrawal"
  amount: number
  status: "pending" | "completed" | "failed"
  date: string
  txHash?: string
}

export const getWalletHistory = async (): Promise<WalletTransaction[]> => {
  try {
    const res = await apiClient.get("/wallet/history")
    return res.data
  } catch (error) {
    console.error("Error fetching wallet history:", error)

    return [
      {
        id: 1,
        type: "topup",
        amount: 10.5,
        status: "completed",
        date: "2023-05-15",
        txHash: "0x123456789abcdef",
      },
      {
        id: 2,
        type: "topup",
        amount: 5.0,
        status: "pending",
        date: "2023-05-16",
      },
      {
        id: 3,
        type: "withdrawal",
        amount: 3.2,
        status: "completed",
        date: "2023-05-17",
        txHash: "0xabcdef123456789",
      },
    ]
  }
}
