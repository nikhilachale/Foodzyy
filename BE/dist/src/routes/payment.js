import { Router } from "express";
import { randomUUID } from "crypto";
import prisma from "../db/prisma.js";
import { authMiddleware, requireRoles } from "../middleware/auth.js";
const router = Router();
// GET /payment - List payment methods for user
router.get("/", authMiddleware, async (req, res) => {
    try {
        const user = req.user;
        const paymentMethods = await prisma.paymentMethod.findMany({
            where: { userId: user.id },
        });
        return res.json(paymentMethods);
    }
    catch (error) {
        console.error("Get payment methods error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
});
// PUT /payment - Add payment method (ADMIN only)
router.put("/", authMiddleware, requireRoles("ADMIN"), async (req, res) => {
    try {
        const user = req.user;
        const { type } = req.body;
        if (!type) {
            return res.status(400).json({ message: "Payment type is required" });
        }
        const paymentMethod = await prisma.paymentMethod.create({
            data: {
                id: randomUUID(),
                type,
                userId: user.id,
            },
        });
        return res.status(201).json(paymentMethod);
    }
    catch (error) {
        console.error("Create payment method error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
});
// DELETE /payment/:id - Delete payment method
router.delete("/:id", authMiddleware, async (req, res) => {
    try {
        const user = req.user;
        const { id } = req.params;
        const paymentMethod = await prisma.paymentMethod.findUnique({
            where: { id },
        });
        if (!paymentMethod) {
            return res.status(404).json({ message: "Payment method not found" });
        }
        // Users can only delete their own payment methods
        if (paymentMethod.userId !== user.id && user.role !== "ADMIN") {
            return res.status(403).json({ message: "Access denied" });
        }
        await prisma.paymentMethod.delete({ where: { id } });
        return res.json({ message: "Payment method deleted" });
    }
    catch (error) {
        console.error("Delete payment method error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
});
export default router;
//# sourceMappingURL=payment.js.map