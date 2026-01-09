import Modal, { ModalHeader, ModalBody, ModalFooter } from "../ui/Modal";

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

interface MenuModalProps {
  restaurant: Restaurant | null;
  onClose: () => void;
  getItemQuantity: (menuItemId: string) => number;
  addItem: (restaurant: Restaurant, item: MenuItem) => void;
  updateQuantity: (menuItemId: string, qty: number) => void;
  totalItems: number;
  totalAmount: number;
  currency: string;
  cartRestaurantId?: string;
  onViewCart: () => void;
}

export default function MenuModal({
  restaurant,
  onClose,
  getItemQuantity,
  addItem,
  updateQuantity,
  totalItems,
  totalAmount,
  currency,
  cartRestaurantId,
  onViewCart,
}: MenuModalProps) {
  if (!restaurant) return null;

  const isIndia = restaurant.country === "INDIA";
  const currencySymbol = isIndia ? "₹" : "$";

  return (
    <Modal isOpen={!!restaurant} onClose={onClose}>
      <ModalHeader
        title={restaurant.name}
        subtitle={restaurant.country}
        countryFlag={isIndia ? "🇮🇳" : "🇺🇸"}
        gradient={isIndia ? "india" : "usa"}
        onClose={onClose}
      />

      <ModalBody>
        <h4 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <span>📋</span> Menu
        </h4>

        {restaurant.menus?.length === 0 ? (
          <p className="text-gray-400 text-center py-8">No menu items available</p>
        ) : (
          <div className="space-y-3">
            {restaurant.menus?.map((item) => {
              const qty = getItemQuantity(item.id);
              return (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5 hover:border-orange-500/30 hover:bg-white/10 transition-all duration-300"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">🍴</span>
                    <div>
                      <span className="font-medium text-white">{item.name}</span>
                      <p className="text-orange-400 font-bold text-sm">
                        {currencySymbol}{item.price}
                      </p>
                    </div>
                  </div>

                  {qty === 0 ? (
                    <button
                      onClick={() => addItem(restaurant, item)}
                      className="bg-linear-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white px-5 py-2 rounded-xl text-sm font-bold transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/25"
                    >
                      Add
                    </button>
                  ) : (
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateQuantity(item.id, qty - 1)}
                        className="bg-white/10 hover:bg-white/20 text-white w-9 h-9 rounded-xl font-bold transition-all duration-300"
                      >
                        −
                      </button>
                      <span className="w-8 text-center font-bold text-white">{qty}</span>
                      <button
                        onClick={() => addItem(restaurant, item)}
                        className="bg-linear-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white w-9 h-9 rounded-xl font-bold transition-all duration-300"
                      >
                        +
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </ModalBody>

      <ModalFooter>
        {totalItems > 0 && cartRestaurantId === restaurant.id ? (
          <button
            onClick={onViewCart}
            className="w-full bg-linear-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 flex items-center justify-between hover:shadow-lg hover:shadow-orange-500/25"
          >
            <span className="flex items-center gap-2">
              🛒 View Cart ({totalItems} items)
            </span>
            <span className="bg-white/20 px-4 py-1 rounded-lg">{currency}{totalAmount}</span>
          </button>
        ) : (
          <button
            onClick={onClose}
            className="w-full bg-white/10 hover:bg-white/15 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 border border-white/10"
          >
            Close Menu
          </button>
        )}
      </ModalFooter>
    </Modal>
  );
}
