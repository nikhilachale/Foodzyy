import { useEffect, useState } from "react";
import { Modal, SimpleModalHeader, ModalBody, ModalFooter } from "../ui";
import api from "../../api/axios";

interface PaymentMethod {
  id: string;
  type: string;
}

interface Order {
  id: string;
  totalAmount: number;
  restaurant?: {
    name: string;
    country: string;
  };
}

interface CheckoutModalProps {
  order: Order | null;
  onClose: () => void;
  onConfirm: (paymentMethodId: string) => void;
  loading: boolean;
}

const PAYMENT_ICONS: Record<string, string> = {
  CREDIT_CARD: "💳",
  DEBIT_CARD: "💳",
  UPI: "📱",
  NET_BANKING: "🏦",
  CASH: "💵",
  WALLET: "👛",
};

// Default payment options available to everyone
const DEFAULT_PAYMENT_OPTIONS = [
  { id: "default_upi", type: "UPI" },
  { id: "default_cash", type: "CASH" },
  { id: "default_debit", type: "DEBIT_CARD" },
];

export default function CheckoutModal({ order, onClose, onConfirm, loading }: CheckoutModalProps) {
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const [selectedMethod, setSelectedMethod] = useState<string>("default_upi");
  const [fetchingMethods, setFetchingMethods] = useState(true);

  useEffect(() => {
    if (order) {
      setFetchingMethods(true);
      api.post("", {
        query: `query { paymentMethods { id type } }`,
      })
        .then((res) => {
          const allMethods = [...DEFAULT_PAYMENT_OPTIONS, ...(res.data.data?.paymentMethods || [])];
          setPaymentMethods(allMethods);
          setSelectedMethod("default_upi");
        })
        .catch(() => {
          setPaymentMethods(DEFAULT_PAYMENT_OPTIONS);
          setSelectedMethod("default_upi");
        })
        .finally(() => setFetchingMethods(false));
    }
  }, [order]);

  if (!order) return null;

  const currency = order.restaurant?.country === "INDIA" ? "₹" : "$";

  return (
    <Modal onClose={onClose}>
      <SimpleModalHeader onClose={onClose}>
        <div className="flex items-center gap-3">
          <span className="text-2xl">✅</span>
          <span>Confirm Checkout</span>
        </div>
      </SimpleModalHeader>
      <ModalBody>
        {/* Order Summary */}
        <div className="bg-white/5 rounded-xl p-4 mb-6 border border-white/10">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Order from</p>
              <p className="text-white font-bold text-lg">{order.restaurant?.name || "Quick Order"}</p>
            </div>
            <div className="text-right">
              <p className="text-gray-400 text-sm">Total</p>
              <p className="text-2xl font-extrabold bg-linear-to-r from-orange-400 to-pink-400 bg-clip-text text-transparent">
                {currency}{order.totalAmount || 0}
              </p>
            </div>
          </div>
        </div>

        {/* Payment Method Selection */}
        <div>
          <p className="text-white font-semibold mb-3 flex items-center gap-2">
            <span>💳</span> Select Payment Method
          </p>
          
          {fetchingMethods ? (
            <div className="flex items-center justify-center py-8">
              <svg className="animate-spin h-8 w-8 text-orange-500" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
            </div>
          ) : (
            <div className="space-y-2">
              {paymentMethods.map((method) => (
                <button
                  key={method.id}
                  onClick={() => setSelectedMethod(method.id)}
                  className={`w-full p-4 rounded-xl border transition-all duration-300 flex items-center gap-3 ${
                    selectedMethod === method.id
                      ? "bg-orange-500/20 border-orange-500 text-orange-400"
                      : "bg-white/5 border-white/10 text-gray-300 hover:border-white/30"
                  }`}
                >
                  <span className="text-xl">{PAYMENT_ICONS[method.type] || "💳"}</span>
                  <span className="font-medium">{method.type.replace(/_/g, " ")}</span>
                  {selectedMethod === method.id && (
                    <span className="ml-auto text-green-400">✓</span>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      </ModalBody>
      <ModalFooter>
        <button
          onClick={onClose}
          className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/15 text-white font-semibold transition-all duration-300"
        >
          Cancel
        </button>
        <button
          onClick={() => onConfirm(selectedMethod)}
          disabled={loading || !selectedMethod}
          className="px-6 py-3 rounded-xl bg-linear-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-bold transition-all duration-300 disabled:opacity-50 flex items-center gap-2"
        >
          {loading ? (
            <>
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Processing...
            </>
          ) : (
            <>
              <span>✓</span>
              Pay {currency}{order.totalAmount || 0}
            </>
          )}
        </button>
      </ModalFooter>
    </Modal>
  );
}
