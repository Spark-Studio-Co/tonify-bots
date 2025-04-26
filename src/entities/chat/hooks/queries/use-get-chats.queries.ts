import { useQuery } from "@tanstack/react-query"
import { getChats } from "../../api/get/get-chats.api"

export const useChats = () => {
  return useQuery({
    queryKey: ["chats"],
    queryFn: getChats,
  })
}
