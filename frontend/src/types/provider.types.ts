export interface Provider {
  id: string;
  restaurantName: string;
  description: string;
  imageUrl: string;
  address: string;
  phone: string;
  _count: { meals: number };
}
