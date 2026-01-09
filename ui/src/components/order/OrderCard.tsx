interface OrderItem {
  id: string;
  quantity: number;
  price: number;
  menuItem: {
    id: string;
    name: string;
    price: number;
  };
}

interface Order {
  id: string;
  status: string;
  totalAmount: number;
  createdAt: string;
  restaurant?: {
    id: string;
    name: string;
    country: string;
  };
  items: OrderItem[];
}

interface StatusConfig {
  bg: string;
  text: string;
  icon: string;
}

export const STATUS_CONFIG: Record<string, StatusConfig> = {
  CREATED: { bg: "from-blue-500/20 to-cyan-500/20", text: "text-cyan-400", icon: "🕐" },
  PLACED: { bg: "from-green-500/20 to-emerald-500/20", text: "text-emerald-400", icon: "✅" },
  CANCELLED: { bg: "from-red-500/20 to-pink-500/20", text: "text-red-400", icon: "❌" },
};

interface OrderCardProps {
  order: Order;
  onSelect: () => void;
  onCheckout?: () => void;
  onCancel?: () => void;
  actionLoading: boolean;
  showActions: boolean;
}

export default function OrderCard({
  order,
  onSelect,
  onCheckout,
  onCancel,
  actionLoading,
  showActions,
}: OrderCardProps) {
  const status = STATUS_CONFIG[order.status] || STATUS_CONFIG.CREATED;
  const isIndia = order.restaurant?.country === "INDIA";
  const currency = isIndia ? "₹" : "$";

  return (
    <div
      className="group bg-linear-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6 hover:border-orange-500/50 hover:shadow-2xl hover:shadow-orange-500/5 transition-all duration-500 cursor-pointer"
      onClick={onSelect}
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className={`h-14 w-14 bg-linear-to-br ${isIndia ? 'from-orange-500/30 to-amber-500/30' : 'from-blue-500/30 to-purple-500/30'} rounded-2xl flex items-center justify-center`}>
            <span className="text-2xl">{isIndia ? '🇮🇳' : '🇺🇸'}</span>
          </div>
          <div>
            <p className="font-bold text-white text-lg group-hover:text-orange-400 transition-colors duration-300">
              {order.restaurant?.name || "Quick Order"}
            </p>
            <p className="text-sm text-gray-400 mt-0.5">
              {order.items?.length || 0} items • <span className="text-orange-400 font-semibold">{currency}{order.totalAmount || 0}</span>
            </p>
            <p className="text-xs text-gray-500 mt-1 flex items-center gap-1.5">
              <span>🕐</span>
              {new Date(order.createdAt).toLocaleString()}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {/* Status Badge */}
          <span className={`px-4 py-2 rounded-xl text-sm font-bold bg-linear-to-br ${status.bg} ${status.text} flex items-center gap-2 border border-white/5`}>
            <span>{status.icon}</span>
            {order.status}
          </span>

          {/* Action Buttons */}
          {showActions && order.status === "CREATED" && (
            <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
              <button
                onClick={onCheckout}
                disabled={actionLoading}
                className="bg-linear-to-br from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 disabled:opacity-50 hover:shadow-lg hover:shadow-green-500/25"
              >
                {actionLoading ? "..." : "✓ Checkout"}
              </button>
              <button
                onClick={onCancel}
                disabled={actionLoading}
                className="bg-linear-to-br from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 disabled:opacity-50 hover:shadow-lg hover:shadow-red-500/25"
              >
                {actionLoading ? "..." : "✕ Cancel"}
              </button>
            </div>
          )}

          {/* View arrow */}
          <span className="text-gray-500 group-hover:text-orange-400 group-hover:translate-x-1 transition-all duration-300 hidden sm:block">
            →
          </span>
        </div>
      </div>
    </div>
  );
}

export type { Order, OrderItem };
