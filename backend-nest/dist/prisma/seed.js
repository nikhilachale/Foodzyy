"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const pg_1 = require("pg");
const crypto_1 = require("crypto");
require("dotenv/config");
const pool = new pg_1.Pool({ connectionString: process.env.DATABASE_URL });
const prisma = new client_1.PrismaClient();
async function main() {
    await prisma.user.createMany({
        data: [
            { id: (0, crypto_1.randomUUID)(), name: 'Nick Fury', phone: '9000000001', role: 'ADMIN', country: 'INDIA' },
            { id: (0, crypto_1.randomUUID)(), name: 'Captain Marvel', phone: '9000000002', role: 'MANAGER', country: 'INDIA' },
            { id: (0, crypto_1.randomUUID)(), name: 'Captain America', phone: '9000000003', role: 'MANAGER', country: 'AMERICA' },
            { id: (0, crypto_1.randomUUID)(), name: 'Thanos', phone: '9000000004', role: 'MEMBER', country: 'INDIA' },
            { id: (0, crypto_1.randomUUID)(), name: 'Thor', phone: '9000000005', role: 'MEMBER', country: 'INDIA' },
            { id: (0, crypto_1.randomUUID)(), name: 'Travis', phone: '9000000006', role: 'MEMBER', country: 'AMERICA' },
        ],
    });
    const restaurants = [
        {
            id: (0, crypto_1.randomUUID)(),
            name: 'Spice Garden',
            country: 'INDIA',
            menuItems: [
                { name: 'Butter Chicken', price: 350 },
                { name: 'Paneer Tikka', price: 280 },
                { name: 'Chicken Biryani', price: 320 },
                { name: 'Butter Naan', price: 50 },
                { name: 'Gulab Jamun', price: 120 },
                { name: 'Raita', price: 60 },
                { name: 'Jeera Rice', price: 150 },
            ],
        },
        {
            id: (0, crypto_1.randomUUID)(),
            name: 'Curry House',
            country: 'INDIA',
            menuItems: [
                { name: 'Dal Makhani', price: 220 },
                { name: 'Chicken Tikka Masala', price: 380 },
                { name: 'Samosa (2 pcs)', price: 60 },
                { name: 'Mango Lassi', price: 80 },
                { name: 'Palak Paneer', price: 260 },
                { name: 'Garlic Naan', price: 60 },
                { name: 'Kheer', price: 100 },
            ],
        },
        {
            id: (0, crypto_1.randomUUID)(),
            name: 'Tandoori Nights',
            country: 'INDIA',
            menuItems: [
                { name: 'Tandoori Chicken (Full)', price: 450 },
                { name: 'Tandoori Chicken (Half)', price: 250 },
                { name: 'Seekh Kebab', price: 320 },
                { name: 'Malai Tikka', price: 340 },
                { name: 'Reshmi Kebab', price: 300 },
                { name: 'Roomali Roti', price: 40 },
                { name: 'Mint Chutney', price: 30 },
            ],
        },
        {
            id: (0, crypto_1.randomUUID)(),
            name: 'Mumbai Street Food',
            country: 'INDIA',
            menuItems: [
                { name: 'Vada Pav', price: 40 },
                { name: 'Pav Bhaji', price: 120 },
                { name: 'Bhel Puri', price: 80 },
                { name: 'Sev Puri', price: 90 },
                { name: 'Pani Puri (6 pcs)', price: 60 },
                { name: 'Ragda Pattice', price: 100 },
                { name: 'Cutting Chai', price: 20 },
                { name: 'Cold Coffee', price: 80 },
            ],
        },
        {
            id: (0, crypto_1.randomUUID)(),
            name: 'South Indian Delight',
            country: 'INDIA',
            menuItems: [
                { name: 'Masala Dosa', price: 120 },
                { name: 'Plain Dosa', price: 80 },
                { name: 'Idli (4 pcs)', price: 70 },
                { name: 'Vada (2 pcs)', price: 60 },
                { name: 'Uttapam', price: 100 },
                { name: 'Medu Vada', price: 80 },
                { name: 'Filter Coffee', price: 40 },
                { name: 'Coconut Chutney', price: 20 },
                { name: 'Sambar', price: 30 },
            ],
        },
        {
            id: (0, crypto_1.randomUUID)(),
            name: 'Royal Mughlai',
            country: 'INDIA',
            menuItems: [
                { name: 'Mutton Rogan Josh', price: 420 },
                { name: 'Chicken Korma', price: 360 },
                { name: 'Shahi Paneer', price: 280 },
                { name: 'Mutton Biryani', price: 400 },
                { name: 'Lucknowi Kebab', price: 350 },
                { name: 'Sheermal', price: 70 },
                { name: 'Phirni', price: 90 },
            ],
        },
        {
            id: (0, crypto_1.randomUUID)(),
            name: 'Chinese Dragon',
            country: 'INDIA',
            menuItems: [
                { name: 'Veg Manchurian', price: 180 },
                { name: 'Chicken Manchurian', price: 220 },
                { name: 'Hakka Noodles', price: 160 },
                { name: 'Schezwan Fried Rice', price: 180 },
                { name: 'Spring Roll (4 pcs)', price: 140 },
                { name: 'Chilli Chicken', price: 240 },
                { name: 'Sweet Corn Soup', price: 100 },
                { name: 'Hot & Sour Soup', price: 110 },
            ],
        },
        {
            id: (0, crypto_1.randomUUID)(),
            name: 'Pizza Paradise',
            country: 'INDIA',
            menuItems: [
                { name: 'Margherita Pizza', price: 249 },
                { name: 'Pepperoni Pizza', price: 349 },
                { name: 'Farmhouse Pizza', price: 329 },
                { name: 'BBQ Chicken Pizza', price: 379 },
                { name: 'Garlic Breadsticks', price: 129 },
                { name: 'Cheesy Dip', price: 49 },
                { name: 'Brownie', price: 99 },
                { name: 'Pepsi', price: 60 },
            ],
        },
        {
            id: (0, crypto_1.randomUUID)(),
            name: 'American Diner',
            country: 'AMERICA',
            menuItems: [
                { name: 'Classic Cheeseburger', price: 12 },
                { name: 'Double Bacon Burger', price: 16 },
                { name: 'Cheese Fries', price: 8 },
                { name: 'Onion Rings', price: 7 },
                { name: 'Chocolate Milkshake', price: 6 },
                { name: 'Vanilla Milkshake', price: 6 },
                { name: 'Hot Dog', price: 9 },
                { name: 'Apple Pie', price: 5 },
            ],
        },
        {
            id: (0, crypto_1.randomUUID)(),
            name: 'NYC Pizza Co',
            country: 'AMERICA',
            menuItems: [
                { name: 'Pepperoni Pizza (Large)', price: 22 },
                { name: 'Pepperoni Pizza (Medium)', price: 18 },
                { name: 'Margherita Pizza', price: 16 },
                { name: 'BBQ Chicken Pizza', price: 20 },
                { name: 'Garlic Knots (6 pcs)', price: 6 },
                { name: 'Caesar Salad', price: 10 },
                { name: 'Tiramisu', price: 8 },
                { name: 'Soda', price: 3 },
            ],
        },
        {
            id: (0, crypto_1.randomUUID)(),
            name: 'Texas BBQ',
            country: 'AMERICA',
            menuItems: [
                { name: 'BBQ Ribs (Full Rack)', price: 28 },
                { name: 'BBQ Ribs (Half Rack)', price: 18 },
                { name: 'Pulled Pork Sandwich', price: 14 },
                { name: 'Brisket Plate', price: 22 },
                { name: 'Coleslaw', price: 4 },
                { name: 'Corn on the Cob', price: 5 },
                { name: 'Mac & Cheese', price: 6 },
                { name: 'Sweet Tea', price: 3 },
            ],
        },
        {
            id: (0, crypto_1.randomUUID)(),
            name: 'Taco Bell Express',
            country: 'AMERICA',
            menuItems: [
                { name: 'Crunchy Taco', price: 3 },
                { name: 'Soft Taco', price: 3 },
                { name: 'Burrito Supreme', price: 8 },
                { name: 'Quesadilla', price: 6 },
                { name: 'Nachos Grande', price: 7 },
                { name: 'Mexican Rice', price: 3 },
                { name: 'Churros (3 pcs)', price: 4 },
                { name: 'Baja Blast', price: 3 },
            ],
        },
        {
            id: (0, crypto_1.randomUUID)(),
            name: 'Sushi Master',
            country: 'AMERICA',
            menuItems: [
                { name: 'California Roll (8 pcs)', price: 12 },
                { name: 'Spicy Tuna Roll', price: 14 },
                { name: 'Dragon Roll', price: 18 },
                { name: 'Salmon Nigiri (2 pcs)', price: 8 },
                { name: 'Edamame', price: 5 },
                { name: 'Miso Soup', price: 4 },
                { name: 'Tempura Shrimp', price: 10 },
                { name: 'Green Tea Ice Cream', price: 6 },
            ],
        },
        {
            id: (0, crypto_1.randomUUID)(),
            name: 'Wing Stop',
            country: 'AMERICA',
            menuItems: [
                { name: 'Classic Wings (10 pcs)', price: 14 },
                { name: 'Boneless Wings (10 pcs)', price: 12 },
                { name: 'Lemon Pepper Wings', price: 15 },
                { name: 'Buffalo Wings', price: 15 },
                { name: 'Ranch Dip', price: 2 },
                { name: 'Blue Cheese Dip', price: 2 },
                { name: 'Celery Sticks', price: 3 },
                { name: 'Seasoned Fries', price: 5 },
            ],
        },
        {
            id: (0, crypto_1.randomUUID)(),
            name: 'Breakfast Club',
            country: 'AMERICA',
            menuItems: [
                { name: 'Pancake Stack', price: 10 },
                { name: 'Belgian Waffle', price: 12 },
                { name: 'Eggs Benedict', price: 14 },
                { name: 'Avocado Toast', price: 11 },
                { name: 'French Toast', price: 10 },
                { name: 'Bacon & Eggs', price: 9 },
                { name: 'Fresh Orange Juice', price: 5 },
                { name: 'Cappuccino', price: 4 },
            ],
        },
        {
            id: (0, crypto_1.randomUUID)(),
            name: 'Smoothie King',
            country: 'AMERICA',
            menuItems: [
                { name: 'Strawberry Banana', price: 7 },
                { name: 'Mango Tango', price: 7 },
                { name: 'Peanut Butter Blast', price: 8 },
                { name: 'Green Detox', price: 9 },
                { name: 'Acai Bowl', price: 12 },
                { name: 'Protein Shake', price: 8 },
                { name: 'Fresh Fruit Cup', price: 6 },
                { name: 'Granola Bar', price: 3 },
            ],
        },
    ];
    for (const restaurant of restaurants) {
        await prisma.restaurant.create({
            data: {
                id: restaurant.id,
                name: restaurant.name,
                country: restaurant.country,
                menus: {
                    create: restaurant.menuItems.map((item) => ({
                        id: (0, crypto_1.randomUUID)(),
                        name: item.name,
                        price: item.price,
                    })),
                },
            },
        });
    }
    console.log('✅ Seed completed: Users, Restaurants, and Menu Items created!');
    console.log(`📊 Created ${restaurants.length} restaurants with ${restaurants.reduce((sum, r) => sum + r.menuItems.length, 0)} menu items`);
}
main()
    .then(() => prisma.$disconnect())
    .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
});
//# sourceMappingURL=seed.js.map