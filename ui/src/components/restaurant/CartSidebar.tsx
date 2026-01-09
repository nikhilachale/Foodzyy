interface MenuItem {
  id: string;
  name: string;
  price: number;
}

interface CartItem {
  menuItem: MenuItem;
  quantity: number;
}

interface Restaurant {
  id: string;
  name: string;
  country: string;
}

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  restaurant: Restaurant | null;
  items: CartItem[];
  currency: string;
  totalAmount: number;
  updateQuantity: (menuItemId: string, qty: number) => void;
  clearCart: () => void;
  onPlaceOrder: () => void;
  placing: boolean;
}

export default function CartSidebar({
  isOpen,
  onClose,
  restaurant,
  items,
  currency,
  totalAmount,
  updateQuantity,
  clearCart,
  onPlaceOrder,
  placing,
}: CartSidebarProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-end z-50 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="bg-linear-to-br from-slate-800 to-slate-900 w-full max-w-md h-full overflow-hidden flex flex-col border-l border-white/10 animate-in slide-in-from-right duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Cart Header */}
        <div className="bg-linear-to-r from-orange-500 to-pink-500 p-6">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-bold text-white flex items-center gap-3">
              🛒 Your Cart
            </h3>
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white text-xl font-bold transition-all duration-300"
            >
              ×
            </button>
          </div>
          {restaurant && (
            <p className="text-white/80 mt-2 flex items-center gap-2">
              <span>🍽️</span> From {restaurant.name}
            </p>
          )}
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-6">
          {items.length === 0 ? (
            <div className="text-center py-16">
              <span className="text-7xl mb-6 block">🛒</span>
              <p className="text-gray-300 text-xl font-medium">Your cart is empty</p>
              <p className="text-gray-500 mt-2">Add items from a restaurant</p>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={item.menuItem.id}
                  className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5 hover:border-orange-500/30 transition-all duration-300"
                >
                  <div className="flex-1">
                    <p className="font-medium text-white">{item.menuItem.name}</p>
                    <p className="text-orange-400 font-bold text-sm mt-1">
                      {currency}{item.menuItem.price} × {item.quantity} ={" "}
                      <span className="text-lg">
                        {currency}{item.menuItem.price * item.quantity}
                      </span>
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateQuantity(item.menuItem.id, item.quantity - 1)}
                      className="bg-white/10 hover:bg-white/20 text-white w-9 h-9 rounded-xl font-bold transition-all duration-300"
                    >
                      −
                    </button>
                    <span className="w-8 text-center font-bold text-white">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.menuItem.id, item.quantity + 1)}
                      className="bg-linear-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white w-9 h-9 rounded-xl font-bold transition-all duration-300"
                    >
                      +
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Cart Footer */}
        {items.length > 0 && (
          <div className="border-t border-white/10 p-6 bg-slate-900/50 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-lg font-bold text-white">Total</span>
              <span className="text-2xl font-extrabold bg-linear-to-r from-orange-400 to-pink-400 bg-clip-text text-transparent">
                {currency}{totalAmount}
              </span>
            </div>
            <div className="flex gap-3">
              <button
                onClick={clearCart}
                className="flex-1 bg-white/10 hover:bg-white/15 text-white font-semibold py-4 px-4 rounded-xl transition-all duration-300 border border-white/10"
              >
                Clear
              </button>
              <button
                onClick={onPlaceOrder}
                disabled={placing}
                className="flex-2 bg-linear-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 disabled:opacity-50 hover:shadow-lg hover:shadow-green-500/25 flex items-center justify-center gap-2"
              >
                {placing ? (
                  <>
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Placing...
                  </>
                ) : (
                  <>🚀 Place Order</>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
