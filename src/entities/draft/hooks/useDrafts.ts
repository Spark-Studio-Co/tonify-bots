import { useQuery } from "@tanstack/react-query"
import { getDrafts } from "@/entities/draft/api/get-drafts"

export const useDrafts = () => {
  return useQuery({
    queryKey: ["drafts"],
    queryFn: getDrafts,
  })
}
