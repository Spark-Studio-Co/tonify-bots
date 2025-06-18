import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createDeal } from "../api/create-deal.api";

export const useCreateDeal = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createDeal,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["deals"] });
      queryClient.invalidateQueries({ queryKey: ["my-deals"] });
    },
  });
};
