import { useQuery } from "@tanstack/react-query"
import { getUsers } from "@/entities/admin/api/get-users"

export const useUsers = () => {
  return useQuery({
    queryKey: ["admin", "users"],
    queryFn: getUsers,
  })
}
