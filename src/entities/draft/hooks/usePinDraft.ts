import { useMutation, useQueryClient } from "@tanstack/react-query"
import { pinDraft } from "@/entities/draft/api/pin-draft"

export const usePinDraft = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: pinDraft,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["drafts"] })
    },
  })
}
