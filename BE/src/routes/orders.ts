import { Router, Response } from "express";
import { randomUUID } from "crypto";
import prisma from "../db/prisma.js";
import { authMiddleware, requireRoles, AuthRequest } from "../middleware/auth.js";

const router = Router();

// GET /orders - List orders
router.get("/", authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;

    const user = req.user!;

    // Users can only see their own orders, ADMIN can see all
    const where = user.role === "ADMIN" ? {} : { userId: user.id };

    const orders = await prisma.order.findMany({
      where,
      skip,
      take: limit,
      orderBy: { createdAt: "desc" },
      include: {
        restaurant: true,
        items: {
          include: {
            menuItem: true,
          },
        },
      },
    });

    return res.json(orders);
  } catch (error) {
    console.error("Get orders error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// POST /orders - Create new order
router.post("/", authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const user = req.user!;
    const { restaurantId, items } = req.body;

    if (!restaurantId || !items?.length) {
      // Legacy: create empty order
      const order = await prisma.order.create({
        data: {
          id: randomUUID(),
          userId: user.id,
          country: user.country,
          status: "CREATED",
        },
      });
      return res.status(201).json(order);
    }

    // Validate restaurant exists
    const restaurant = await prisma.restaurant.findUnique({
      where: { id: restaurantId },
    });
    if (!restaurant) {
      return res.status(400).json({ message: "Restaurant not found" });
    }

    // Fetch menu items and calculate total
    const menuItems = await prisma.menuItem.findMany({
      where: {
        id: { in: items.map((i: { menuItemId: string }) => i.menuItemId) },
        restaurantId,
      },
    });

    if (menuItems.length !== items.length) {
      return res.status(400).json({ message: "Some menu items are invalid" });
    }

    const totalAmount = items.reduce((sum: number, item: { menuItemId: string; quantity: number }) => {
      const menuItem = menuItems.find((m) => m.id === item.menuItemId);
      return sum + (menuItem?.price || 0) * item.quantity;
    }, 0);

    // Create order with items
    const orderId = randomUUID();
    const order = await prisma.order.create({
      data: {
        id: orderId,
        userId: user.id,
        country: user.country,
        status: "CREATED",
        restaurantId,
        totalAmount,
        items: {
          create: items.map((item: { menuItemId: string; quantity: number }) => {
            const menuItem = menuItems.find((m) => m.id === item.menuItemId);
            return {
              id: randomUUID(),
              menuItemId: item.menuItemId,
              quantity: item.quantity,
              price: menuItem?.price || 0,
            };
          }),
        },
      },
      include: {
        restaurant: true,
        items: {
          include: {
            menuItem: true,
          },
        },
      },
    });

    return res.status(201).json(order);
  } catch (error) {
    console.error("Create order error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// POST /orders/:id/checkout - Checkout order (ADMIN/MANAGER only)
router.post(
  "/:id/checkout",
  authMiddleware,
  requireRoles("ADMIN", "MANAGER"),
  async (req: AuthRequest, res: Response) => {
    try {
      const { id } = req.params;
      const user = req.user!;

      const order = await prisma.order.findUnique({ where: { id } });
      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }

      // Cross-country check for managers
      if (user.role !== "ADMIN" && order.country !== user.country) {
        return res.status(403).json({ message: "Cross-country access denied" });
      }

      const updatedOrder = await prisma.order.update({
        where: { id },
        data: { status: "PLACED" },
        include: {
          restaurant: true,
          items: {
            include: {
              menuItem: true,
            },
          },
        },
      });

      return res.json(updatedOrder);
    } catch (error) {
      console.error("Checkout error:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
);

// POST /orders/:id/cancel - Cancel order (ADMIN/MANAGER only)
router.post(
  "/:id/cancel",
  authMiddleware,
  requireRoles("ADMIN", "MANAGER"),
  async (req: AuthRequest, res: Response) => {
    try {
      const { id } = req.params;
      const user = req.user!;

      const order = await prisma.order.findUnique({ where: { id } });
      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }

      // Cross-country check for managers
      if (user.role !== "ADMIN" && order.country !== user.country) {
        return res.status(403).json({ message: "Cross-country access denied" });
      }

      const updatedOrder = await prisma.order.update({
        where: { id },
        data: { status: "CANCELLED" },
        include: {
          restaurant: true,
          items: {
            include: {
              menuItem: true,
            },
          },
        },
      });

      return res.json(updatedOrder);
    } catch (error) {
      console.error("Cancel order error:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
);

export default router;
