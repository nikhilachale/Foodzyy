import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
async function main() {
    console.log("🌱 Seeding database...");
    // Clean existing data
    await prisma.orderItem.deleteMany();
    await prisma.order.deleteMany();
    await prisma.menuItem.deleteMany();
    await prisma.restaurant.deleteMany();
    await prisma.paymentMethod.deleteMany();
    await prisma.user.deleteMany();
    // Create users with phone numbers
    const adminUser = await prisma.user.create({
        data: {
            name: "Admin User",
            phone: "9999999999",
            role: "ADMIN",
            country: "INDIA",
        },
    });
    const managerIndia = await prisma.user.create({
        data: {
            name: "Manager India",
            phone: "8888888888",
            role: "MANAGER",
            country: "INDIA",
        },
    });
    const managerUSA = await prisma.user.create({
        data: {
            name: "Manager USA",
            phone: "7777777777",
            role: "MANAGER",
            country: "AMERICA",
        },
    });
    const memberIndia = await prisma.user.create({
        data: {
            name: "Member India",
            phone: "6666666666",
            role: "MEMBER",
            country: "INDIA",
        },
    });
    const memberUSA = await prisma.user.create({
        data: {
            name: "Member USA",
            phone: "5555555555",
            role: "MEMBER",
            country: "AMERICA",
        },
    });
    console.log("✅ Created users");
    // Create Indian Restaurants
    const indianRestaurant1 = await prisma.restaurant.create({
        data: {
            name: "Spice Garden",
            country: "INDIA",
            menus: {
                create: [
                    { name: "Butter Chicken", price: 350 },
                    { name: "Paneer Tikka", price: 280 },
                    { name: "Biryani", price: 320 },
                    { name: "Naan Bread", price: 60 },
                    { name: "Dal Makhani", price: 220 },
                ],
            },
        },
    });
    const indianRestaurant2 = await prisma.restaurant.create({
        data: {
            name: "Curry House",
            country: "INDIA",
            menus: {
                create: [
                    { name: "Chicken Curry", price: 300 },
                    { name: "Vegetable Korma", price: 250 },
                    { name: "Tandoori Chicken", price: 380 },
                    { name: "Garlic Naan", price: 70 },
                    { name: "Mango Lassi", price: 90 },
                ],
            },
        },
    });
    const indianRestaurant3 = await prisma.restaurant.create({
        data: {
            name: "Tandoor Express",
            country: "INDIA",
            menus: {
                create: [
                    { name: "Seekh Kebab", price: 260 },
                    { name: "Palak Paneer", price: 240 },
                    { name: "Rogan Josh", price: 400 },
                    { name: "Jeera Rice", price: 150 },
                ],
            },
        },
    });
    console.log("✅ Created Indian restaurants");
    // Create American Restaurants
    const usaRestaurant1 = await prisma.restaurant.create({
        data: {
            name: "Burger Barn",
            country: "AMERICA",
            menus: {
                create: [
                    { name: "Classic Burger", price: 12 },
                    { name: "Cheese Fries", price: 8 },
                    { name: "Milkshake", price: 6 },
                    { name: "BBQ Bacon Burger", price: 15 },
                    { name: "Onion Rings", price: 7 },
                ],
            },
        },
    });
    const usaRestaurant2 = await prisma.restaurant.create({
        data: {
            name: "Pizza Palace",
            country: "AMERICA",
            menus: {
                create: [
                    { name: "Pepperoni Pizza", price: 18 },
                    { name: "Margherita Pizza", price: 15 },
                    { name: "Buffalo Wings", price: 12 },
                    { name: "Garlic Bread", price: 6 },
                    { name: "Caesar Salad", price: 10 },
                ],
            },
        },
    });
    const usaRestaurant3 = await prisma.restaurant.create({
        data: {
            name: "Taco Town",
            country: "AMERICA",
            menus: {
                create: [
                    { name: "Beef Tacos", price: 10 },
                    { name: "Chicken Burrito", price: 12 },
                    { name: "Nachos Supreme", price: 14 },
                    { name: "Guacamole", price: 8 },
                ],
            },
        },
    });
    console.log("✅ Created American restaurants");
    // Create Payment Methods for Admin
    await prisma.paymentMethod.createMany({
        data: [
            { type: "CREDIT_CARD", userId: adminUser.id },
            { type: "UPI", userId: adminUser.id },
            { type: "NET_BANKING", userId: adminUser.id },
        ],
    });
    // Create Payment Methods for Managers
    await prisma.paymentMethod.createMany({
        data: [
            { type: "CREDIT_CARD", userId: managerIndia.id },
            { type: "UPI", userId: managerIndia.id },
            { type: "CREDIT_CARD", userId: managerUSA.id },
            { type: "DEBIT_CARD", userId: managerUSA.id },
        ],
    });
    console.log("✅ Created payment methods");
    console.log("🎉 Seeding complete!");
}
main()
    .catch((e) => {
    console.error("❌ Seeding failed:", e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=seed.js.map