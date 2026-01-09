import { Router, Response } from "express";
import prisma from "../db/prisma.js";
import { authMiddleware, AuthRequest } from "../middleware/auth.js";

const router = Router();

// GET /restaurants - List restaurants (filtered by country for non-admins)
router.get("/", authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;

    const user = req.user!;
    const where = user.role === "ADMIN" ? {} : { country: user.country };

    const restaurants = await prisma.restaurant.findMany({
      where,
      skip,
      take: limit,
      include: { menus: true },
    });

    return res.json(restaurants);
  } catch (error) {
    console.error("Get restaurants error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// GET /restaurants/:id - Get single restaurant
router.get("/:id", authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    const restaurant = await prisma.restaurant.findUnique({
      where: { id },
      include: { menus: true },
    });

    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }

    // Check country access for non-admins
    const user = req.user!;
    if (user.role !== "ADMIN" && restaurant.country !== user.country) {
      return res.status(403).json({ message: "Access denied" });
    }

    return res.json(restaurant);
  } catch (error) {
    console.error("Get restaurant error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
