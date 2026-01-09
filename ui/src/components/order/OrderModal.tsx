import Modal, { ModalHeader, ModalBody, ModalFooter } from "../ui/Modal";
import { STATUS_CONFIG } from "./OrderCard";
import type { Order } from "./OrderCard";

interface OrderModalProps {
  order: Order | null;
  onClose: () => void;
  onCheckout?: () => void;
  onCancel?: () => void;
  showActions: boolean;
}

export default function OrderModal({
  order,
  onClose,
  onCheckout,
  onCancel,
  showActions,
}: OrderModalProps) {
  if (!order) return null;

  const isIndia = order.restaurant?.country === "INDIA";
  const currency = isIndia ? "₹" : "$";
  const status = STATUS_CONFIG[order.status] || STATUS_CONFIG.CREATED;

  return (
    <Modal isOpen={!!order} onClose={onClose}>
      <ModalHeader
        title="Order Details"
        subtitle={order.restaurant?.name || "Quick Order"}
        countryFlag={isIndia ? "🇮🇳" : "🇺🇸"}
        gradient={isIndia ? "india" : "usa"}
        onClose={onClose}
      />

      <ModalBody className="max-h-[40vh]">
        <div className="flex items-center justify-between mb-6">
          <span className={`px-4 py-2 rounded-xl text-sm font-bold bg-linear-to-br ${status.bg} ${status.text} flex items-center gap-2 border border-white/5`}>
            <span>{status.icon}</span>
            {order.status}
          </span>
          <span className="text-sm text-gray-400 flex items-center gap-1.5">
            🕐 {new Date(order.createdAt).toLocaleString()}
          </span>
        </div>

        <h4 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <span>📋</span> Order Items
        </h4>

        {!order.items || order.items.length === 0 ? (
          <p className="text-gray-400 text-center py-8">No items in this order</p>
        ) : (
          <div className="space-y-3">
            {order.items.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🍴</span>
                  <div>
                    <p className="font-medium text-white">{item.menuItem.name}</p>
                    <p className="text-sm text-gray-400">Qty: {item.quantity}</p>
                  </div>
                </div>
                <span className="text-orange-400 font-bold text-lg">
                  {currency}{item.price * item.quantity}
                </span>
              </div>
            ))}
          </div>
        )}
      </ModalBody>

      <ModalFooter>
        <div className="flex items-center justify-between mb-6">
          <span className="text-lg font-bold text-white">Total Amount</span>
          <span className="text-3xl font-extrabold bg-linear-to-br from-orange-400 to-pink-400 bg-clip-text text-transparent">
            {currency}{order.totalAmount || 0}
          </span>
        </div>

        {showActions && order.status === "CREATED" && (
          <div className="flex gap-3">
            <button
              onClick={() => {
                onCheckout?.();
                onClose();
              }}
              className="flex-1 bg-linear-to-br from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-bold py-4 px-4 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-green-500/25 flex items-center justify-center gap-2"
            >
              ✓ Checkout Order
            </button>
            <button
              onClick={() => {
                onCancel?.();
                onClose();
              }}
              className="flex-1 bg-linear-to-br from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white font-bold py-4 px-4 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-red-500/25 flex items-center justify-center gap-2"
            >
              ✕ Cancel Order
            </button>
          </div>
        )}
      </ModalFooter>
    </Modal>
  );
}
