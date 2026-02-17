export interface Meal {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  isAvailable: boolean;
  provider: {
    id: string;
    restaurantName: string;
  };
}
