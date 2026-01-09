import { Router } from "express";
import jwt from "jsonwebtoken";
import prisma from "../db/prisma.js";
import { authMiddleware } from "../middleware/auth.js";
const router = Router();
const JWT_SECRET = process.env.JWT_SECRET || "secret123";
// POST /auth/login - Public endpoint for login/signup with phone
router.post("/login", async (req, res) => {
    try {
        const { phone } = req.body;
        if (!phone) {
            return res.status(400).json({ message: "Phone number is required" });
        }
        // Validate phone number (basic validation - 10 digits)
        const cleanPhone = phone.replace(/\D/g, "");
        if (cleanPhone.length < 10) {
            return res.status(400).json({ message: "Invalid phone number. Must be at least 10 digits." });
        }
        // Try to find user by phone
        let user = await prisma.user.findUnique({ where: { phone: cleanPhone } });
        let isNewUser = false;
        // If user doesn't exist, create a new one (signup)
        if (!user) {
            user = await prisma.user.create({
                data: {
                    phone: cleanPhone,
                    name: null,
                    role: "MEMBER",
                    country: "INDIA",
                },
            });
            isNewUser = true;
        }
        const payload = {
            sub: user.id,
            phone: user.phone,
            name: user.name,
            role: user.role,
            country: user.country,
        };
        const access_token = jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });
        return res.json({
            access_token,
            isNewUser,
            user: {
                id: user.id,
                phone: user.phone,
                name: user.name,
                role: user.role,
                country: user.country,
            },
        });
    }
    catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
});
// PUT /auth/profile - Update user profile (requires auth)
router.put("/profile", authMiddleware, async (req, res) => {
    try {
        const { name } = req.body;
        if (!name) {
            return res.status(400).json({ message: "Name is required" });
        }
        const userId = req.user.id;
        const user = await prisma.user.findUnique({ where: { id: userId } });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        // Only update name, keep existing country/role (defaults: INDIA, MEMBER)
        const updatedUser = await prisma.user.update({
            where: { id: userId },
            data: { name },
        });
        // Generate new token with updated info
        const payload = {
            sub: updatedUser.id,
            phone: updatedUser.phone,
            name: updatedUser.name,
            role: updatedUser.role,
            country: updatedUser.country,
        };
        const access_token = jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });
        return res.json({
            access_token,
            user: {
                id: updatedUser.id,
                phone: updatedUser.phone,
                name: updatedUser.name,
                role: updatedUser.role,
                country: updatedUser.country,
            },
        });
    }
    catch (error) {
        console.error("Profile update error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
});
export default router;
//# sourceMappingURL=auth.js.map