import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deleteDraft } from "@/entities/draft/api/delete-draft"

export const useDeleteDraft = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteDraft,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["drafts"] })
    },
  })
}
