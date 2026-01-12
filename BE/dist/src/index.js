import "dotenv/config";
import express from "express";
import cors from "cors";
// REST route imports removed (migrated to GraphQL)
const app = express();
const PORT = process.env.PORT || 3000;
// Middleware
app.use(cors());
app.use(express.json());
// Request logging
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
    next();
});
// Health check
app.get("/health", (req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
});
// Routes
// app.use("/auth", authRoutes);
// app.use("/restaurants", restaurantRoutes);
// app.use("/orders", orderRoutes);
// app.use("/payment", paymentRoutes);
// 404 handler
app.use((req, res) => {
    res.status(404).json({ message: "Route not found" });
});
// Error handler
app.use((err, req, res, next) => {
    console.error("Error:", err);
    res.status(500).json({ message: "Internal server error" });
});
// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`📚 API Endpoints:`);
    console.log(`   POST   /auth/login         - Login/Signup with phone`);
    console.log(`   PUT    /auth/profile       - Update user profile`);
    console.log(`   GET    /restaurants        - List restaurants`);
    console.log(`   GET    /restaurants/:id    - Get restaurant details`);
    console.log(`   GET    /orders             - List orders`);
    console.log(`   POST   /orders             - Create order`);
    console.log(`   POST   /orders/:id/checkout - Checkout order`);
    console.log(`   POST   /orders/:id/cancel  - Cancel order`);
    console.log(`   GET    /payment            - List payment methods`);
    console.log(`   PUT    /payment            - Add payment method`);
    console.log(`   DELETE /payment/:id        - Delete payment method`);
});
export default app;
//# sourceMappingURL=index.js.map