export interface ProfileInputData {
  userId: string;
  restaurantName: string;
  description?: string;
  address: string;
  phone: string;
}

export interface AddMealInput {
  name: string;
  description?: string;
  price: number;
  imageUrl?: string;
  isAvailable?: boolean;
  providerId: string;
  categoryId: string;
}
