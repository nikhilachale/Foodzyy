import jwt from "jsonwebtoken";
import { randomUUID } from "crypto";
import { PrismaClient } from "@prisma/client";

const JWT_SECRET = process.env.JWT_SECRET as string;

type GraphQLContext = {
  prisma: PrismaClient;
  user: {
    id: string;
    role: "ADMIN" | "MANAGER" | "MEMBER";
    country: "INDIA" | "AMERICA";
    phone?: string;
    name?: string | null;
  } | null;
};

const resolvers = {
  Query: {
    me: async (_parent: unknown, _args: any, { prisma, user }: GraphQLContext) => {
      if (!user) return null;
      // Use user.id to find the current user
      const userId = user.id;
      if (!userId) return null;
      return prisma.user.findUnique({ where: { id: userId } });
    },
    restaurants: async (
      _parent: unknown,
      args: { page?: number; limit?: number },
      { prisma, user }: GraphQLContext
    ) => {
      const page = args.page ?? 1;
      const limit = args.limit ?? 10;
      let where = {};
      if (!user) {
        // Not logged in, show nothing
        where = { id: "__none__" };
      } else if (user.role === "ADMIN") {
        where = {};
      } else if (user.role === "MANAGER" || user.role === "MEMBER") {
        where = { country: user.country };
      }
      return prisma.restaurant.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        include: { menus: true },
      });
    },
    restaurant: async (
      _parent: unknown,
      args: { id: string },
      { prisma, user }: GraphQLContext
    ) => {
      return prisma.restaurant.findUnique({ where: { id: args.id }, include: { menus: true } });
    },
    orders: async (
      _parent: unknown,
      args: { page?: number; limit?: number },
      { prisma, user }: GraphQLContext
    ) => {
      const page = args.page ?? 1;
      const limit = args.limit ?? 10;
      let where = {};
      if (user?.role === "ADMIN") {
        where = {};
      } else if (user?.role === "MANAGER") {
        where = { country: user.country };
      } else {
        where = { userId: user?.id };
      }
      const orders = await prisma.order.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: "desc" },
        include: {
          restaurant: true,
          items: { include: { menuItem: true } },
        },
      });
      return orders.map(order => ({
        ...order,
        createdAt: order.createdAt.toISOString(),
      }));
    },
    paymentMethods: async (_parent: unknown, _args: any, { prisma, user }: GraphQLContext) => {
      return prisma.paymentMethod.findMany({ where: { userId: user!.id } });
    },
  },
  Mutation: {
                markOrderPlaced: async (
                  _parent: unknown,
                  args: { orderId: string },
                  { prisma, user }: GraphQLContext
                ) => {
                  if (!user) throw new Error("Unauthorized");

                  const order = await prisma.order.findUnique({
                    where: { id: args.orderId },
                  });
                  if (!order) throw new Error("Order not found");

                  // RBAC: Only ADMIN or MANAGER of same country can place
                  if (
                    user.role === "MEMBER" ||
                    (user.role === "MANAGER" && order.country !== user.country)
                  ) {
                    throw new Error("Forbidden");
                  }

                  const updatedOrder = await prisma.order.update({
                    where: { id: args.orderId },
                    data: { status: "PLACED" },
                  });
                  return {
                    ...updatedOrder,
                    createdAt: updatedOrder.createdAt.toISOString(),
                  };
                },
            cancelOrder: async (
              _parent: unknown,
              args: { orderId: string },
              { prisma, user }: GraphQLContext
            ) => {
              if (!user) throw new Error("Unauthorized");

              const order = await prisma.order.findUnique({
                where: { id: args.orderId },
              });

              if (!order) throw new Error("Order not found");

              // RBAC: ADMIN can cancel any, MANAGER can cancel same-country, MEMBER cannot cancel
              if (
                user.role === "MEMBER" ||
                (user.role === "MANAGER" && order.country !== user.country)
              ) {
                throw new Error("Forbidden");
              }

              // Delete order items first (FK constraint)
              await prisma.orderItem.deleteMany({
                where: { orderId: args.orderId },
              });

              // Delete order
              const deletedOrder = await prisma.order.delete({
                where: { id: args.orderId },
              });

              return {
                ...deletedOrder,
                createdAt: deletedOrder.createdAt.toISOString(),
              };
            },
        updateUser: async (_parent: unknown, args: { name: string; country: "INDIA" | "AMERICA" }, { prisma, user }: GraphQLContext) => {
          if (!user) throw new Error("Unauthorized");
          const updated = await prisma.user.update({
            where: { id: user.id },
            data: { name: args.name, country: args.country },
          });
          return updated;
        },
    login: async (
      _parent: unknown,
      args: { phone: string },
      { prisma, user }: GraphQLContext
    ) => {
      const cleanPhone = args.phone.replace(/\D/g, "");
      let dbUser = await prisma.user.findUnique({ where: { phone: cleanPhone } });
      if (!dbUser) {
        dbUser = await prisma.user.create({
          data: { phone: cleanPhone, name: null, role: "MEMBER", country: "INDIA" },
        });
      }
      const token = jwt.sign(
        {
          id: dbUser.id,
          phone: dbUser.phone,
          name: dbUser.name,
          role: dbUser.role,
          country: dbUser.country,
        },
        JWT_SECRET,
      );
      return token;
    },
    addPaymentMethod: async (
      _parent: unknown,
      args: { type: string },
      { prisma, user }: GraphQLContext
    ) => {
      if (!user || user.role !== "ADMIN") throw new Error("Unauthorized");
      return prisma.paymentMethod.create({
        data: { id: randomUUID(), userId: user.id, type: args.type },
      });
    },
    placeOrder: async (
      _parent: unknown,
      args: { restaurantId: string; items: { menuItemId: string; quantity: number }[] },
      { prisma, user }: GraphQLContext
    ) => {
      if (!user) throw new Error("Unauthorized");
      let totalAmount = 0;
      const orderItems = await Promise.all(
        args.items.map(async (item) => {
          const menu = await prisma.menuItem.findUnique({
            where: { id: item.menuItemId },
          });
          if (!menu) throw new Error("Menu item not found");
          totalAmount += menu.price * item.quantity;
          return {
            menuItemId: item.menuItemId,
            quantity: item.quantity,
            price: menu.price,
          };
        })
      );
      const order = await prisma.order.create({
        data: {
          userId: user.id,
          restaurantId: args.restaurantId,
          status: "CREATED",
          country: user.country,
          totalAmount,
          items: {
            create: orderItems,
          },
        },
        include: {
          restaurant: true,
          items: { include: { menuItem: true } },
        },
      });
      return {
        ...order,
        createdAt: order.createdAt.toISOString(),
      };
    },
  },
  User: {
    orders: (parent: any, _args: unknown, { prisma }: GraphQLContext) =>
      prisma.order.findMany({ where: { userId: parent.id } }),
    payments: (parent: any, _args: unknown, { prisma }: GraphQLContext) =>
      prisma.paymentMethod.findMany({ where: { userId: parent.id } }),
  },
  Restaurant: {
    menus: (parent: any, _args: unknown, { prisma }: GraphQLContext) =>
      prisma.menuItem.findMany({ where: { restaurantId: parent.id } }),
  },
  Order: {
    user: (parent: any, _args: unknown, { prisma }: GraphQLContext) =>
      prisma.user.findUnique({ where: { id: parent.userId } }),
    restaurant: (parent: any, _args: unknown, { prisma }: GraphQLContext) =>
      prisma.restaurant.findUnique({ where: { id: parent.restaurantId } }),
    items: (parent: any, _args: unknown, { prisma }: GraphQLContext) =>
      prisma.orderItem.findMany({ where: { orderId: parent.id }, include: { menuItem: true } }),
  },
  OrderItem: {
    menuItem: (parent: any, _args: unknown, { prisma }: GraphQLContext) =>
      prisma.menuItem.findUnique({ where: { id: parent.menuItemId } }),
  },
  PaymentMethod: {
    user: (parent: any, _args: unknown, { prisma }: GraphQLContext) =>
      prisma.user.findUnique({ where: { id: parent.userId } }),
  },
};

export default resolvers;
