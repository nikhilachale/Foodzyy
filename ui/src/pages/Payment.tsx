import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";
import { AppHeader, PageLayout, PageContent, PageHero } from "../components/layout";
import { LoadingState, EmptyState, Modal, SimpleModalHeader, ModalBody, ModalFooter } from "../components/ui";

interface PaymentMethod {
  id: string;
  type: string;
  createdAt: string;
}

const PAYMENT_ICONS: Record<string, string> = {
  CREDIT_CARD: "💳",
  DEBIT_CARD: "💳",
  UPI: "📱",
  NET_BANKING: "🏦",
  CASH: "💵",
  WALLET: "👛",
};

const PAYMENT_TYPES = [
  { value: "CREDIT_CARD", label: "Credit Card" },
  { value: "DEBIT_CARD", label: "Debit Card" },
  { value: "UPI", label: "UPI" },
  { value: "NET_BANKING", label: "Net Banking" },
  { value: "CASH", label: "Cash on Delivery" },
  { value: "WALLET", label: "Digital Wallet" },
];

export default function Payment() {
  const { user } = useAuth();
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const [loading, setLoading] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedType, setSelectedType] = useState("");
  const [adding, setAdding] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);

  const isAdmin = user?.role === "ADMIN";

  const fetchPaymentMethods = async () => {
    try {
      const response = await api.post("", {
        query: `query { paymentMethods { id type } }`,
      });
      setPaymentMethods(response.data.data?.paymentMethods || []);
    } catch (error) {
      setPaymentMethods([]);
      console.error("Failed to fetch payment methods", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPaymentMethods();
  }, []);

  const addPaymentMethod = async () => {
    if (!selectedType) return;
    setAdding(true);
    try {
      await api.post("", {
        query: `mutation AddPaymentMethod($type: String!) { addPaymentMethod(type: $type) { id type } }`,
        variables: { type: selectedType },
      });
      await fetchPaymentMethods();
      setShowAddModal(false);
      setSelectedType("");
    } catch (error) {
      console.error("Failed to add payment method", error);
    } finally {
      setAdding(false);
    }
  };

  // No deletePaymentMethod mutation in backend, so just close modal for now
  const deletePaymentMethod = async (id: string) => {
    setDeleting(id);
    setTimeout(() => setDeleting(null), 500);
  };

  const navLinks = [
    { to: "/restaurants", label: "Restaurants", icon: "🍽️", isActive: false },
    { to: "/orders", label: "Orders", icon: "📦", isActive: false },
    ...(user?.role === "ADMIN" ? [{ to: "/payment", label: "Payment", icon: "💳", isActive: true }] : []),
  ];

  return (
    <PageLayout>
      <AppHeader
        navLinks={navLinks}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />

      <PageContent>
        <PageHero
          title="Payment"
          highlightedText="Methods"
          subtitle="Manage your payment options for quick checkout"
          rightContent={
            isAdmin ? (
              <button
                onClick={() => setShowAddModal(true)}
                className="inline-flex items-center gap-2 bg-linear-to-br from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/25 group"
              >
                <span className="text-lg">+</span>
                <span>Add Payment Method</span>
              </button>
            ) : undefined
          }
        />

        {!isAdmin && (
          <div className="mb-6 p-4 bg-amber-500/10 border border-amber-500/30 rounded-xl flex items-center gap-3">
            <span className="text-2xl">🔒</span>
            <p className="text-amber-300 text-sm">
              Only <span className="font-bold">ADMIN</span> users can add new payment methods. Contact your administrator to add new options.
            </p>
          </div>
        )}

        {loading ? (
          <LoadingState icon="💳" message="Loading payment methods..." />
        ) : paymentMethods.length === 0 ? (
          <EmptyState
            icon="💳"
            title="No payment methods"
            subtitle={isAdmin ? "Add a payment method to get started" : "No payment methods available yet"}
            action={
              isAdmin ? (
                <button
                  onClick={() => setShowAddModal(true)}
                  className="inline-flex items-center gap-2 bg-linear-to-br from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white font-bold py-3 px-8 rounded-xl transition-all duration-300"
                >
                  Add Payment Method
                </button>
              ) : (
                <Link
                  to="/restaurants"
                  className="inline-flex items-center gap-2 bg-linear-to-br from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white font-bold py-3 px-8 rounded-xl transition-all duration-300"
                >
                  Browse Restaurants →
                </Link>
              )
            }
          />
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {paymentMethods.map((method) => (
              <div
                key={method.id}
                className="group bg-linear-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6 hover:border-orange-500/50 hover:shadow-2xl hover:shadow-orange-500/5 transition-all duration-500"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <div className="h-14 w-14 bg-linear-to-br from-orange-500/30 to-pink-500/30 rounded-2xl flex items-center justify-center">
                      <span className="text-2xl">{PAYMENT_ICONS[method.type] || "💳"}</span>
                    </div>
                    <div>
                      <p className="font-bold text-white text-lg group-hover:text-orange-400 transition-colors duration-300">
                        {method.type.replace(/_/g, " ")}
                      </p>
                      <p className="text-xs text-gray-500 mt-1 flex items-center gap-1.5">
                        <span>📅</span>
                        Added {new Date(method.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => deletePaymentMethod(method.id)}
                    disabled={deleting === method.id}
                    className="opacity-0 group-hover:opacity-100 bg-red-500/20 hover:bg-red-500/30 text-red-400 p-2 rounded-xl transition-all duration-300 disabled:opacity-50"
                    title="Delete payment method"
                  >
                    {deleting === method.id ? (
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                    ) : (
                      <span>🗑️</span>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </PageContent>

      {/* Add Payment Method Modal */}
      {showAddModal && (
        <Modal onClose={() => setShowAddModal(false)}>
          <SimpleModalHeader onClose={() => setShowAddModal(false)}>
            <div className="flex items-center gap-3">
              <span className="text-2xl">💳</span>
              <span>Add Payment Method</span>
            </div>
          </SimpleModalHeader>
          <ModalBody>
            <p className="text-gray-400 mb-4">Select a payment method type to add:</p>
            <div className="grid grid-cols-2 gap-3">
              {PAYMENT_TYPES.map((type) => (
                <button
                  key={type.value}
                  onClick={() => setSelectedType(type.value)}
                  className={`p-4 rounded-xl border transition-all duration-300 flex items-center gap-3 ${
                    selectedType === type.value
                      ? "bg-orange-500/20 border-orange-500 text-orange-400"
                      : "bg-white/5 border-white/10 text-gray-300 hover:border-white/30"
                  }`}
                >
                  <span className="text-xl">{PAYMENT_ICONS[type.value] || "💳"}</span>
                  <span className="font-medium">{type.label}</span>
                </button>
              ))}
            </div>
          </ModalBody>
          <ModalFooter>
            <button
              onClick={() => setShowAddModal(false)}
              className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/15 text-white font-semibold transition-all duration-300"
            >
              Cancel
            </button>
            <button
              onClick={addPaymentMethod}
              disabled={!selectedType || adding}
              className="px-6 py-3 rounded-xl bg-linear-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white font-bold transition-all duration-300 disabled:opacity-50 flex items-center gap-2"
            >
              {adding ? (
                <>
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Adding...
                </>
              ) : (
                "Add Method"
              )}
            </button>
          </ModalFooter>
        </Modal>
      )}
    </PageLayout>
  );
}
