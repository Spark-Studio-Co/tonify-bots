import { useMutation } from "@tanstack/react-query"
import { loginUser } from "../../api/post/login.api"

export const useLoginUser = () => {
  return useMutation({
    mutationKey: ["auth-login"],
    mutationFn: loginUser,
  })
}
