import { useMutation } from "@tanstack/react-query";
import { verifyCode } from "../../api/post/verify-auth.api";

export const useVerifyCode = () => {
  return useMutation({
    mutationKey: ["verify-code"],
    mutationFn: verifyCode,
  });
};
