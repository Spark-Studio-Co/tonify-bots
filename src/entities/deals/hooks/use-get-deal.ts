"use client";

import { apiClient } from "@/shared/api/apiClient";
import { Deal } from "@/shared/types/types";
import { useQuery } from "@tanstack/react-query";

export const useGetDeal = (dealId: number) => {
  return useQuery<Deal>({
    queryKey: ["deal", dealId],
    queryFn: async () => {
      const response = await apiClient.get(`/deals/${dealId}`);
      return response.data;
    },
    staleTime: 5 * 60 * 1000, // 5 минут
  });
};
