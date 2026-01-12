import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";
import { AppHeader, PageLayout, PageContent, PageHero } from "../components/layout";
import { LoadingState, EmptyState } from "../components/ui";
import { OrderCard, OrderModal, CheckoutModal } from "../components/order";
import type { Order } from "../components/order";

export default function Orders() {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [checkoutOrder, setCheckoutOrder] = useState<Order | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  const fetchOrders = async () => {
    try {
      const response = await api.post("", {
        query: `
          query GetOrders($page: Int, $limit: Int) {
            orders(page: $page, limit: $limit) {
              id
              status
              totalAmount
              createdAt
              restaurant { id name country }
              items { id quantity menuItem { id name price } }
            }
          }
        `,
        variables: { page: 1, limit: 20 },
      });
      console.log("[Orders] Data received from backend:", response.data.data?.orders);
      setOrders(response.data.data?.orders || []);
    } catch {
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const initiateCheckout = (order: Order) => {
    setCheckoutOrder(order);
  };

  // Call GraphQL mutation to mark order as placed
  const confirmCheckout = async () => {
    if (!checkoutOrder) return;
    setActionLoading(checkoutOrder.id);
    try {
      await api.post("/graphql", {
        query: `
          mutation MarkOrderPlaced($orderId: ID!) {
            markOrderPlaced(orderId: $orderId) {
              id
              status
            }
          }
        `,
        variables: { orderId: checkoutOrder.id },
      });
      setOrders((orders) =>
        orders.map((order) =>
          order.id === checkoutOrder.id
            ? { ...order, status: "PLACED" }
            : order
        )
      );
    } catch (error) {
      console.error("Failed to place order", error);
    } finally {
      setActionLoading(null);
      setCheckoutOrder(null);
    }
  };

  // Call GraphQL mutation to cancel and remove order from backend
  const cancel = async (id: string) => {
    console.log("[Orders] Cancel order:", id);
    setActionLoading(id);
    try {
      await api.post("/graphql", {
        query: `
          mutation CancelOrder($orderId: ID!) {
            cancelOrder(orderId: $orderId) {
              id
            }
          }
        `,
        variables: { orderId: id },
      });
      setOrders((orders) => orders.filter((order) => order.id !== id));
    } catch (error) {
      console.error("Failed to cancel order", error);
    } finally {
      setActionLoading(null);
    }
  };

  const navLinks = [
    { to: "/restaurants", label: "Restaurants", icon: "🍽️", isActive: false },
    { to: "/orders", label: "Orders", icon: "📦", isActive: true },
    ...(user?.role === "ADMIN" ? [{ to: "/payment", label: "Payment", icon: "💳", isActive: false }] : []),
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
                onCheckout={() => initiateCheckout(order)}
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
        onCheckout={() => selectedOrder && initiateCheckout(selectedOrder)}
        onCancel={() => selectedOrder && cancel(selectedOrder.id)}
        showActions={showActions}
      />

      <CheckoutModal
        order={checkoutOrder}
        onClose={() => setCheckoutOrder(null)}
        onConfirm={confirmCheckout}
        loading={actionLoading === checkoutOrder?.id}
      />
    </PageLayout>
  );
}
