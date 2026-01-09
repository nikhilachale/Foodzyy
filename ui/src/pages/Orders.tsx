import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";
import { AppHeader, PageLayout, PageContent, PageHero } from "../components/layout";
import { LoadingState, EmptyState } from "../components/ui";
import { OrderCard, OrderModal } from "../components/order";
import type { Order } from "../components/order";

export default function Orders() {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  const fetchOrders = async () => {
    const res = await api.get("/orders?page=1&limit=20");
    setOrders(res.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const checkout = async (id: string) => {
    setActionLoading(id);
    await api.post(`/orders/${id}/checkout`);
    await fetchOrders();
    setActionLoading(null);
  };

  const cancel = async (id: string) => {
    setActionLoading(id);
    await api.post(`/orders/${id}/cancel`);
    await fetchOrders();
    setActionLoading(null);
  };

  const navLinks = [
    { to: "/restaurants", label: "Restaurants", icon: "🍽️", isActive: false },
    { to: "/orders", label: "Orders", icon: "📦", isActive: true },
  ];

  const showActions = user?.role !== "MEMBER";

  return (
    <PageLayout>
      <AppHeader
        navLinks={navLinks}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />

      <PageContent>
        <PageHero
          title="Your"
          highlightedText="Orders"
          subtitle="Track and manage your food orders"
          rightContent={
            <Link
              to="/restaurants"
              className="inline-flex items-center gap-2 bg-linear-to-br from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/25 group"
            >
              <span className="text-lg">+</span>
              <span>Order Food</span>
              <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
            </Link>
          }
        />

        {loading ? (
          <LoadingState icon="📦" message="Loading orders..." />
        ) : orders.length === 0 ? (
          <EmptyState
            icon="📦"
            title="No orders yet"
            subtitle="Start ordering food from restaurants"
            action={
              <Link
                to="/restaurants"
                className="inline-flex items-center gap-2 bg-linear-to-br from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white font-bold py-3 px-8 rounded-xl transition-all duration-300"
              >
                Browse Restaurants →
              </Link>
            }
          />
        ) : (
          <div className="grid gap-4">
            {orders.map((order) => (
              <OrderCard
                key={order.id}
                order={order}
                onSelect={() => setSelectedOrder(order)}
                onCheckout={() => checkout(order.id)}
                onCancel={() => cancel(order.id)}
                actionLoading={actionLoading === order.id}
                showActions={showActions}
              />
            ))}
          </div>
        )}
      </PageContent>

      <OrderModal
        order={selectedOrder}
        onClose={() => setSelectedOrder(null)}
        onCheckout={() => selectedOrder && checkout(selectedOrder.id)}
        onCancel={() => selectedOrder && cancel(selectedOrder.id)}
        showActions={showActions}
      />
    </PageLayout>
  );
}

