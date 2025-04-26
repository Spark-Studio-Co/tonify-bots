import { useMutation, useQueryClient } from "@tanstack/react-query"
import { publishAnnouncement } from "@/entities/publication/api/publish-announcement"

export const usePublishAnnouncement = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: publishAnnouncement,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["publications", "log"] })
    },
  })
}
