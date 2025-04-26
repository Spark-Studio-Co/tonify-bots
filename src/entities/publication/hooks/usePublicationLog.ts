import { useQuery } from "@tanstack/react-query"
import { getPublicationLog } from "@/entities/publication/api/get-publication-log"

export const usePublicationLog = () => {
  return useQuery({
    queryKey: ["publications", "log"],
    queryFn: getPublicationLog,
  })
}
