import { useQuery } from "@tanstack/react-query"
import { getDraft } from "@/entities/draft/api/get-draft"

export const useGetDraft = (id: number) => {
  return useQuery({
    queryKey: ["drafts", id],
    queryFn: () => getDraft(id),
    enabled: !!id,
  })
}
