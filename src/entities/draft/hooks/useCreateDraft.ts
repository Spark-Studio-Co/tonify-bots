import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createDraft } from "@/entities/draft/api/create-draft"

export const useCreateDraft = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createDraft,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["drafts"] })
    },
  })
}
