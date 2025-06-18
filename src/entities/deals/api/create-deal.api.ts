import { apiClient } from "@/shared/api/apiClient";

export interface CreateDealRequest {
  announcementId: number;
  chatId: string;
  price: number;
}

export interface Deal {
  id: number;
  adId: number;
  chatId: string;
  advertiserId: number;
  ownerId: number;
  price: number;
  feePercent: number;
  isCompleted: boolean;
  createdAt: string;
  ad?: {
    id: number;
    text: string;
    status: string;
  };
  chat?: {
    id: number;
    name: string;
    chatId: string;
  };
  advertiser?: {
    userId: number;
    telegramUsername: string;
    name: string;
  };
  owner?: {
    userId: number;
    telegramUsername: string;
    name: string;
  };
}

export const createDeal = async (data: CreateDealRequest): Promise<Deal> => {
  const response = await apiClient.post("/deal", {
    adId: data.announcementId,
    chatId: data.chatId,
  });
  return response.data;
};

export const getMyDeals = async (): Promise<Deal[]> => {
  const response = await apiClient.get("/deal/my-deals");
  return response.data;
};

export const approveDeal = async (dealId: number): Promise<Deal> => {
  const response = await apiClient.post(`/deal/${dealId}/approve`);
  return response.data;
};
