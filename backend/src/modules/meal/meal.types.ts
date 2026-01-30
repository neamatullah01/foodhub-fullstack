export interface AddMealInput {
  name: string;
  description?: string;
  price: number;
  imageUrl?: string;
  isAvailable?: boolean;
  providerId: string;
  categoryId: string;
}

export interface GetAllMealQuery {
  search?: string;
}
