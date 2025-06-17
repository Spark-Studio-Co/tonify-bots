import { useQuery } from "@tanstack/react-query";
import { getMe } from "@/entities/auth/api/post/get-me.ts";

export const useGetMe = () => {
  return useQuery({
    queryKey: ["auth", "me"],
    queryFn: getMe,
    retry: false,
  });
};
