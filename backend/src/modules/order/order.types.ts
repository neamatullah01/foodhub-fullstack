export interface PlaceOrderInput {
  providerId: string;
  address: string;
  paymentMethod: string;
  items: {
    mealId: string;
    quantity: number;
  }[];
}
