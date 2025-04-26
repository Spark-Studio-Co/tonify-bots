// src/entities/wallet/hooks/mutations/use-create-topup.mutation.ts
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createTopUp } from "@/entities/wallet/api/create-top-up.ts"

export const useCreateTopUp = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createTopUp,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["auth", "me"] })
    },
  })
}
