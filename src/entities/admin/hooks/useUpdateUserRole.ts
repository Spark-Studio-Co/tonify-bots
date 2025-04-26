import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateUserRole } from "@/entities/admin/api/update-user-role"

export const useUpdateUserRole = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: updateUserRole,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "users"] })
    },
  })
}
