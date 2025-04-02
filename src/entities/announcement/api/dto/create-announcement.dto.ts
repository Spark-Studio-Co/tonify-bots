export interface ICreateAnnouncementDTO {
  name: string;
  status: string;
  description: string;
  imageUrl: string;
  price?: number;
  categories: string[];
  telegramUsername: string;
}
