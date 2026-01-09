import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { useCart } from "../context/CartContext";
import { AppHeader, PageLayout, PageContent, PageHero } from "../components/layout";
import { LoadingState, EmptyState } from "../components/ui";
import { CartButton, RestaurantCard, MenuModal, CartSidebar } from "../components/restaurant";

interface MenuItem {
  id: string;
  name: string;
  price: number;
}

interface Restaurant {
  id: string;
  name: string;
  country: string;
  menus: MenuItem[];
}

const RESTAURANT_EMOJIS = ["🍕", "🍔", "🌮", "🍜", "🍣", "🥗", "🍝", "🍛", "🥘", "🍱", "🍲", "🥡", "🍗", "🥪", "🌯", "🍿"];

export default function Restaurants() {
  const { 
    restaurant: cartRestaurant, 
    items: cartItems, 
    addItem, 
    updateQuantity, 
    clearCart, 
    totalAmount, 
    totalItems 
  } = useCart();
  const navigate = useNavigate();
  
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);
  const [showCart, setShowCart] = useState(false);
  const [placing, setPlacing] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    api.get("/restaurants?page=1&limit=20")
      .then(res => setRestaurants(res.data))
      .finally(() => setLoading(false));
  }, []);

  const getItemQuantity = (menuItemId: string) => {
    const item = cartItems.find((i) => i.menuItem.id === menuItemId);
    return item?.quantity || 0;
  };

  const placeOrder = async () => {
    if (!cartRestaurant || cartItems.length === 0) return;
    
    setPlacing(true);
    try {
      await api.post("/orders", {
        restaurantId: cartRestaurant.id,
        items: cartItems.map((item) => ({
          menuItemId: item.menuItem.id,
          quantity: item.quantity,
        })),
      });
      clearCart();
      setShowCart(false);
      navigate("/orders");
    } catch (error) {
      console.error("Failed to place order", error);
    } finally {
      setPlacing(false);
    }
  };

  const currency = cartRestaurant?.country === "INDIA" ? "₹" : "$";

  const navLinks = [
    { to: "/restaurants", label: "Restaurants", icon: "🍽️", isActive: true },
    { to: "/orders", label: "Orders", icon: "📦", isActive: false },
  ];

  return (
    <PageLayout>
      <AppHeader
        navLinks={navLinks}
        rightContent={<CartButton totalItems={totalItems} onClick={() => setShowCart(true)} />}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />

      <PageContent>
        <PageHero
          title="Discover"
          highlightedText="Restaurants"
          subtitle={`Find your next favorite meal from ${restaurants.length} options`}
        />

        {loading ? (
          <LoadingState icon="🍕" message="Loading restaurants..." />
        ) : restaurants.length === 0 ? (
          <EmptyState
            icon="🍽️"
            title="No restaurants found"
            subtitle="Check back later for new options"
          />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {restaurants.map((r, index) => (
              <RestaurantCard
                key={r.id}
                restaurant={r}
                emoji={RESTAURANT_EMOJIS[index % RESTAURANT_EMOJIS.length]}
                onClick={() => setSelectedRestaurant(r)}
              />
            ))}
          </div>
        )}
      </PageContent>

      <MenuModal
        restaurant={selectedRestaurant}
        onClose={() => setSelectedRestaurant(null)}
        getItemQuantity={getItemQuantity}
        addItem={addItem}
        updateQuantity={updateQuantity}
        totalItems={totalItems}
        totalAmount={totalAmount}
        currency={currency}
        cartRestaurantId={cartRestaurant?.id}
        onViewCart={() => {
          setSelectedRestaurant(null);
          setShowCart(true);
        }}
      />

      <CartSidebar
        isOpen={showCart}
        onClose={() => setShowCart(false)}
        restaurant={cartRestaurant}
        items={cartItems}
        currency={currency}
        totalAmount={totalAmount}
        updateQuantity={updateQuantity}
        clearCart={clearCart}
        onPlaceOrder={placeOrder}
        placing={placing}
      />
    </PageLayout>
  );
}
