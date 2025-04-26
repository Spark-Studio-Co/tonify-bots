export interface Announcement {
  id: number
  name: string
  status: string
  description: string
  imageUrl: string
  price: number | null
  categories: string[]
  userId: number
}
