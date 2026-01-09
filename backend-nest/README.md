# Food Ordering Application – RBAC Enabled (Take-Home Assignment)

## Overview
This is a full-stack backend application built using **NestJS + Prisma + PostgreSQL (Neon)** that demonstrates:

- Role Based Access Control (RBAC)
- Country-based data isolation (Bonus Objective)
- JWT authentication
- Paginated APIs
- Clean service/controller separation

The application models a food ordering system with Admin, Manager, and Member roles.

---

## Tech Stack
- **Backend**: NestJS (TypeScript)
- **ORM**: Prisma
- **Database**: PostgreSQL (Neon Cloud)
- **Auth**: JWT (Passport)
- **Validation**: class-validator, class-transformer

---

## Roles & Access Matrix

| Feature                          | Admin | Manager | Member |
|----------------------------------|-------|---------|--------|
| View restaurants & menu          | ✅    | ✅      | ✅     |
| Create order                     | ✅    | ✅      | ✅     |
| Checkout / Place order           | ✅    | ✅      | ❌     |
| Cancel order                     | ✅    | ✅      | ❌     |
| Update payment method            | ✅    | ❌      | ❌     |

### Country-Based Restriction (Bonus)
- Admin → Global access
- Manager / Member → Can access data **only from their own country**

---

## Setup Instructions

### 1. Clone Repository
```bash
git clone <repo-url>
cd backend