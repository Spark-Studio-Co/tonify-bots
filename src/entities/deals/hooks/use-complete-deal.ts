"use client";

import { apiClient } from "@/shared/api/apiClient";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface CompleteDealParams {
  dealId: number;
}

export const useCompleteDeal = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ dealId }: CompleteDealParams) => {
      const response = await apiClient.patch(`/deals/${dealId}/complete`);
      return response.data;
    },
    onSuccess: (_, variables) => {
      // Инвалидация кэша для обновления данных
      queryClient.invalidateQueries({ queryKey: ["deals"] });
      queryClient.invalidateQueries({ queryKey: ["deal", variables.dealId] });
    },
  });
};
