import { Meal } from "./meal.types";

export interface Provider {
  id: string;
  userId: string;
  restaurantName: string;
  description: string;
  imageUrl: string;
  address: string;
  phone: string;
  _count: { meals: number };
  meals: Meal[];
}
