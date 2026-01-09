# 🍕 Foodzyy - Food Ordering Platform

A full-stack food ordering application with role-based access control (RBAC) and country-based data filtering.

## 📋 Features

### Core Functionality
- 🍽️ **View Restaurants & Menu Items** - Browse restaurants and their menus
- 🛒 **Create Orders** - Add food items to cart and place orders
- 💳 **Checkout & Pay** - Complete orders with payment method selection
- ❌ **Cancel Orders** - Cancel pending orders
- 💰 **Manage Payment Methods** - Add/remove payment options (Admin only)

### Role-Based Access Control (RBAC)

| Function | ADMIN | MANAGER | MEMBER |
|----------|:-----:|:-------:|:------:|
| View restaurants | ✅ | ✅ | ✅ |
| Create order | ✅ | ✅ | ✅ |
| Checkout / Pay | ✅ | ✅ | ❌ |
| Cancel order | ✅ | ✅ | ❌ |
| Update payment methods | ✅ | ❌ | ❌ |
| View all orders | ✅ (all) | ✅ (country) | ✅ (own) |

### Country-Based Access
- **INDIA 🇮🇳** - Users see Indian restaurants and orders
- **AMERICA 🇺🇸** - Users see American restaurants and orders
- **ADMIN** - Can see restaurants and orders from both countries

## 🏗️ Tech Stack

### Frontend (`/ui`)
- **React 18** - UI Framework
- **TypeScript** - Type safety
- **Tailwind CSS 4** - Styling
- **Vite** - Build tool
- **React Router** - Navigation
- **Axios** - HTTP client

### Backend (`/BE`)
- **Node.js** - Runtime
- **Express.js** - Web framework
- **TypeScript** - Type safety
- **Prisma ORM** - Database access
- **PostgreSQL** - Database (Neon)
- **JWT** - Authentication

## 📁 Project Structure

```
Foodzyy/
├── ui/                     # Frontend (React + Vite)
│   ├── src/
│   │   ├── api/           # Axios configuration
│   │   ├── components/    # Reusable components
│   │   │   ├── layout/    # AppHeader, PageLayout, etc.
│   │   │   ├── ui/        # LoadingState, Modal, etc.
│   │   │   ├── restaurant/# RestaurantCard, MenuModal, etc.
│   │   │   └── order/     # OrderCard, CheckoutModal, etc.
│   │   ├── context/       # AuthContext, CartContext
│   │   ├── pages/         # Login, Restaurants, Orders, Payment
│   │   └── App.tsx        # Routes
│   └── .env.example       # Environment variables template
│
├── BE/                     # Backend (Express + Prisma)
│   ├── src/
│   │   ├── routes/        # API routes
│   │   │   ├── auth.ts    # Login, profile update
│   │   │   ├── restaurants.ts
│   │   │   ├── orders.ts
│   │   │   └── payment.ts
│   │   ├── middleware/    # Auth middleware
│   │   └── db/            # Prisma client
│   └── prisma/
│       ├── schema.prisma  # Database schema
│       └── seed.ts        # Seed data
│
└── backend/                # Legacy NestJS backend (deprecated)
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- PostgreSQL database (or Neon account)

### 1. Clone & Install

```bash
# Clone the repository
git clone <repo-url>
cd Foodzyy

# Install frontend dependencies
cd ui
npm install

# Install backend dependencies
cd ../BE
npm install
```

### 2. Configure Environment

**Backend (`BE/.env`):**
```env
DATABASE_URL="postgresql://user:password@host:5432/database"
JWT_SECRET="your-secret-key"
PORT=3000
```

**Frontend (`ui/.env`):**
```env
VITE_API_URL=http://localhost:3000
```

### 3. Setup Database

```bash
cd BE

# Generate Prisma client
npm run db:generate

# Push schema to database
npm run db:push

# Seed with sample data
npm run db:seed
```

### 4. Run the Application

```bash
# Terminal 1: Start backend
cd BE
npm run dev

# Terminal 2: Start frontend
cd ui
npm run dev
```

- Frontend: http://localhost:5173
- Backend: http://localhost:3000

## 👥 Test Users

After seeding, these users are available:

| Phone | Name | Role | Country |
|-------|------|------|---------|
| 9999999999 | Admin User | ADMIN | INDIA |
| 8888888888 | Manager India | MANAGER | INDIA |
| 7777777777 | Manager USA | MANAGER | AMERICA |
| 6666666666 | Member India | MEMBER | INDIA |
| 5555555555 | Member USA | MEMBER | AMERICA |

## 🔌 API Endpoints

### Authentication
- `POST /auth/login` - Login with phone number
- `PUT /auth/profile` - Update user profile

### Restaurants
- `GET /restaurants` - List restaurants (country-filtered)
- `GET /restaurants/:id` - Get restaurant details

### Orders
- `GET /orders` - List orders (role-based filtering)
- `POST /orders` - Create new order
- `POST /orders/:id/checkout` - Checkout order (ADMIN/MANAGER)
- `POST /orders/:id/cancel` - Cancel order (ADMIN/MANAGER)

### Payment
- `GET /payment` - List payment methods
- `PUT /payment` - Add payment method (ADMIN only)
- `DELETE /payment/:id` - Delete payment method

## 🎨 UI Components

The frontend uses a modular component architecture:

- **Layout Components**: `AppHeader`, `PageLayout`, `PageContent`, `PageHero`
- **UI Components**: `LoadingState`, `EmptyState`, `Modal`, `ModalHeader`, `ModalBody`, `ModalFooter`
- **Restaurant Components**: `RestaurantCard`, `MenuModal`, `CartSidebar`, `CartButton`
- **Order Components**: `OrderCard`, `OrderModal`, `CheckoutModal`

## 📝 Default Payment Options

All users have access to these default payment methods during checkout:
- 📱 UPI
- 💵 Cash
- 💳 Debit Card

Admins can add additional payment methods via the Payment page.

## 📄 License

MIT License
