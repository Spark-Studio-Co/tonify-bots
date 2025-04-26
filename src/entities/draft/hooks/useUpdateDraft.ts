import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateDraft } from "@/entities/draft/api/update-draft"

export const useUpdateDraft = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: updateDraft,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["drafts"] })
      queryClient.invalidateQueries({ queryKey: ["drafts", data.id] })
    },
  })
}
