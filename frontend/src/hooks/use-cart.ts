import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { toast } from "sonner";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  providerId: string;
  restaurantName: string;
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  addItem: (data: Omit<CartItem, "quantity">) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  cartTotal: () => number;
}

export const useCart = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (data) => {
        const currentItems = get().items;
        const existingItem = currentItems.find((item) => item.id === data.id);

        if (
          currentItems.length > 0 &&
          currentItems[0].providerId !== data.providerId
        ) {
          toast.error(
            `You can only order from one restaurant at a time. Clear your cart to order from ${data.restaurantName}.`,
          );
          return;
        }

        if (existingItem) {
          set({
            items: currentItems.map((item) =>
              item.id === data.id
                ? { ...item, quantity: item.quantity + 1 }
                : item,
            ),
          });
          toast.success("Increased item quantity");
        } else {
          set({ items: [...currentItems, { ...data, quantity: 1 }] });
          toast.success(`${data.name} added to cart!`);
        }
      },

      removeItem: (id) => {
        set({ items: get().items.filter((item) => item.id !== id) });
        toast.success("Item removed from cart");
      },

      updateQuantity: (id, quantity) => {
        if (quantity <= 0) {
          get().removeItem(id);
          return;
        }
        set({
          items: get().items.map((item) =>
            item.id === id ? { ...item, quantity } : item,
          ),
        });
      },

      clearCart: () => set({ items: [] }),

      cartTotal: () => {
        return get().items.reduce(
          (total, item) => total + item.price * item.quantity,
          0,
        );
      },
    }),
    {
      name: "foodhub-cart-storage",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
