import { useMutation, useQueryClient } from "@tanstack/react-query"
import { bindWallet } from "@/entities/wallet/api/bind-wallet"

export const useBindWallet = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: bindWallet,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["auth", "me"] })
    },
  })
}
