# Foodzyy Backend (Express.js + TypeScript)

A Node.js + Express.js + TypeScript backend for the Foodzyy food ordering application.

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Language:** TypeScript
- **Database:** PostgreSQL
- **ORM:** Prisma
- **Authentication:** JWT

## Project Structure

```
BE/
├── prisma/
│   ├── schema.prisma    # Database schema
│   └── seed.ts          # Database seeding script
├── src/
│   ├── db/
│   │   └── prisma.ts    # Prisma client instance
│   ├── middleware/
│   │   └── auth.ts      # JWT auth & role guards
│   ├── routes/
│   │   ├── auth.ts      # Authentication routes
│   │   ├── orders.ts    # Order management routes
│   │   ├── payment.ts   # Payment routes
│   │   └── restaurants.ts # Restaurant routes
│   └── index.ts         # Express app entry point
├── .env                 # Environment variables
├── tsconfig.json        # TypeScript configuration
└── package.json
```

## Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Generate Prisma client:**
   ```bash
   npm run db:generate
   ```

3. **Push schema to database:**
   ```bash
   npm run db:push
   ```

4. **Seed the database:**
   ```bash
   npm run seed
   ```

5. **Start the server:**
   ```bash
   npm run dev    # Development with hot reload
   npm run build  # Build for production
   npm start      # Production (runs compiled JS)
   ```

## API Endpoints

### Authentication
- `POST /auth/login` - Login with username

### Restaurants
- `GET /restaurants` - Get all restaurants (filtered by user's country)

### Orders
- `GET /orders` - Get all orders
- `POST /orders` - Create a new order with cart items
- `POST /orders/:id/checkout` - Checkout order (ADMIN/MANAGER)
- `POST /orders/:id/cancel` - Cancel order (ADMIN/MANAGER)

### Payment
- `PUT /payment` - Add payment method (ADMIN only)

## User Roles

- **ADMIN** - Full access, can see all countries
- **MANAGER** - Can checkout/cancel orders in their country
- **MEMBER** - Can view restaurants and create orders

## Demo Users

| Name | Role | Country |
|------|------|---------|
| Nick Fury | ADMIN | INDIA |
| Captain Marvel | MANAGER | INDIA |
| Captain America | MANAGER | AMERICA |
| Thanos | MEMBER | INDIA |
| Thor | MEMBER | INDIA |
| Travis | MEMBER | AMERICA |

## Environment Variables

```env
DATABASE_URL="your-postgres-connection-string"
JWT_SECRET="your-jwt-secret"
PORT=3000
```
