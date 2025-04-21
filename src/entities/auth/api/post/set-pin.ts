import { useMutation } from "@tanstack/react-query";
import { apiClient } from "@/shared/api/apiClient";

export const useSetPin = () => {
    return useMutation({
        mutationFn: async (data: { telegramUsername: string; pin: string }) => {
            const res = await apiClient.post("/auth/set-pin", data);
            return res.data;
        },
    });
};
