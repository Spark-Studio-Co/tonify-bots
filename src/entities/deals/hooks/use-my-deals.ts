import { useQuery } from "@tanstack/react-query";
import { getMyDeals } from "../api/create-deal.api";

export const useMyDeals = () => {
  return useQuery({
    queryKey: ["my-deals"],
    queryFn: getMyDeals,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};
