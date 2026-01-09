import { createContext, useContext, useState, type ReactNode } from "react";

interface MenuItem {
  id: string;
  name: string;
  price: number;
}

interface Restaurant {
  id: string;
  name: string;
  country: string;
}

interface CartItem {
  menuItem: MenuItem;
  quantity: number;
}

interface CartContextType {
  restaurant: Restaurant | null;
  items: CartItem[];
  addItem: (restaurant: Restaurant, menuItem: MenuItem) => void;
  removeItem: (menuItemId: string) => void;
  updateQuantity: (menuItemId: string, quantity: number) => void;
  clearCart: () => void;
  totalAmount: number;
  totalItems: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [items, setItems] = useState<CartItem[]>([]);

  const addItem = (newRestaurant: Restaurant, menuItem: MenuItem) => {
    // If cart is empty or same restaurant, add item
    if (!restaurant || restaurant.id === newRestaurant.id) {
      setRestaurant(newRestaurant);
      setItems((prev) => {
        const existing = prev.find((item) => item.menuItem.id === menuItem.id);
        if (existing) {
          return prev.map((item) =>
            item.menuItem.id === menuItem.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
        }
        return [...prev, { menuItem, quantity: 1 }];
      });
    } else {
      // Different restaurant - ask to clear cart
      if (
        window.confirm(
          `You have items from ${restaurant.name}. Clear cart and add items from ${newRestaurant.name}?`
        )
      ) {
        setRestaurant(newRestaurant);
        setItems([{ menuItem, quantity: 1 }]);
      }
    }
  };

  const removeItem = (menuItemId: string) => {
    setItems((prev) => {
      const newItems = prev.filter((item) => item.menuItem.id !== menuItemId);
      if (newItems.length === 0) {
        setRestaurant(null);
      }
      return newItems;
    });
  };

  const updateQuantity = (menuItemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(menuItemId);
      return;
    }
    setItems((prev) =>
      prev.map((item) =>
        item.menuItem.id === menuItemId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setRestaurant(null);
    setItems([]);
  };

  const totalAmount = items.reduce(
    (sum, item) => sum + item.menuItem.price * item.quantity,
    0
  );

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        restaurant,
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        totalAmount,
        totalItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
