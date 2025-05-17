"use client";

import { FilterOptions } from "@/pages/deals-page/deals-page";
import { apiClient } from "@/shared/api/apiClient";
import { Deal } from "@/shared/types/types";
import { useQuery } from "@tanstack/react-query";

export const useGetDeals = (filters: FilterOptions) => {
  return useQuery<Deal[]>({
    queryKey: ["deals", filters],
    queryFn: async () => {
      const params = new URLSearchParams();

      if (filters.status !== "all") {
        params.append(
          "isCompleted",
          filters.status === "completed" ? "true" : "false"
        );
      }

      if (filters.search) {
        params.append("search", filters.search);
      }

      if (filters.dateRange.from) {
        params.append("fromDate", filters.dateRange.from.toISOString());
      }

      if (filters.dateRange.to) {
        params.append("toDate", filters.dateRange.to.toISOString());
      }

      const response = await apiClient.get(`/deals?${params.toString()}`);
      return response.data;
    },
    staleTime: 5 * 60 * 1000,
  });
};
