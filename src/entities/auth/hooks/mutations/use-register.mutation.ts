import { useMutation } from "@tanstack/react-query"
import { registerUser } from "../../api/post/register.api"

export const useRegisterUser = () => {
  return useMutation({
    mutationKey: ["auth-register"],
    mutationFn: registerUser,
  })
}
