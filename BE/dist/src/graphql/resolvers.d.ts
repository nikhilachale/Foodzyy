import { PrismaClient } from "@prisma/client";
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
declare const resolvers: {
    Query: {
        me: (_parent: unknown, _args: any, { prisma, user }: GraphQLContext) => Promise<{
            id: string;
            phone: string;
            name: string | null;
            role: import("@prisma/client").$Enums.Role;
            country: import("@prisma/client").$Enums.Country;
        } | null>;
        restaurants: (_parent: unknown, args: {
            page?: number;
            limit?: number;
        }, { prisma, user }: GraphQLContext) => Promise<({
            menus: {
                id: string;
                name: string;
                restaurantId: string;
                price: number;
            }[];
        } & {
            id: string;
            name: string;
            country: import("@prisma/client").$Enums.Country;
        })[]>;
        restaurant: (_parent: unknown, args: {
            id: string;
        }, { prisma, user }: GraphQLContext) => Promise<({
            menus: {
                id: string;
                name: string;
                restaurantId: string;
                price: number;
            }[];
        } & {
            id: string;
            name: string;
            country: import("@prisma/client").$Enums.Country;
        }) | null>;
        orders: (_parent: unknown, args: {
            page?: number;
            limit?: number;
        }, { prisma, user }: GraphQLContext) => Promise<{
            createdAt: string;
            restaurant: {
                id: string;
                name: string;
                country: import("@prisma/client").$Enums.Country;
            } | null;
            items: ({
                menuItem: {
                    id: string;
                    name: string;
                    restaurantId: string;
                    price: number;
                };
            } & {
                id: string;
                orderId: string;
                menuItemId: string;
                quantity: number;
                price: number;
            })[];
            id: string;
            country: import("@prisma/client").$Enums.Country;
            userId: string;
            status: import("@prisma/client").$Enums.OrderStatus;
            restaurantId: string | null;
            totalAmount: number;
            paymentMethodId: string | null;
        }[]>;
        paymentMethods: (_parent: unknown, _args: any, { prisma, user }: GraphQLContext) => Promise<{
            id: string;
            userId: string;
            createdAt: Date;
            type: string;
        }[]>;
    };
    Mutation: {
        markOrderPlaced: (_parent: unknown, args: {
            orderId: string;
        }, { prisma, user }: GraphQLContext) => Promise<{
            createdAt: string;
            id: string;
            country: import("@prisma/client").$Enums.Country;
            userId: string;
            status: import("@prisma/client").$Enums.OrderStatus;
            restaurantId: string | null;
            totalAmount: number;
            paymentMethodId: string | null;
        }>;
        cancelOrder: (_parent: unknown, args: {
            orderId: string;
        }, { prisma, user }: GraphQLContext) => Promise<{
            createdAt: string;
            id: string;
            country: import("@prisma/client").$Enums.Country;
            userId: string;
            status: import("@prisma/client").$Enums.OrderStatus;
            restaurantId: string | null;
            totalAmount: number;
            paymentMethodId: string | null;
        }>;
        updateUser: (_parent: unknown, args: {
            name: string;
            country: "INDIA" | "AMERICA";
        }, { prisma, user }: GraphQLContext) => Promise<{
            id: string;
            phone: string;
            name: string | null;
            role: import("@prisma/client").$Enums.Role;
            country: import("@prisma/client").$Enums.Country;
        }>;
        login: (_parent: unknown, args: {
            phone: string;
        }, { prisma, user }: GraphQLContext) => Promise<string>;
        addPaymentMethod: (_parent: unknown, args: {
            type: string;
        }, { prisma, user }: GraphQLContext) => Promise<{
            id: string;
            userId: string;
            createdAt: Date;
            type: string;
        }>;
        placeOrder: (_parent: unknown, args: {
            restaurantId: string;
            items: {
                menuItemId: string;
                quantity: number;
            }[];
        }, { prisma, user }: GraphQLContext) => Promise<{
            createdAt: string;
            restaurant: {
                id: string;
                name: string;
                country: import("@prisma/client").$Enums.Country;
            } | null;
            items: ({
                menuItem: {
                    id: string;
                    name: string;
                    restaurantId: string;
                    price: number;
                };
            } & {
                id: string;
                orderId: string;
                menuItemId: string;
                quantity: number;
                price: number;
            })[];
            id: string;
            country: import("@prisma/client").$Enums.Country;
            userId: string;
            status: import("@prisma/client").$Enums.OrderStatus;
            restaurantId: string | null;
            totalAmount: number;
            paymentMethodId: string | null;
        }>;
    };
    User: {
        orders: (parent: any, _args: unknown, { prisma }: GraphQLContext) => import("@prisma/client").Prisma.PrismaPromise<{
            id: string;
            country: import("@prisma/client").$Enums.Country;
            userId: string;
            status: import("@prisma/client").$Enums.OrderStatus;
            restaurantId: string | null;
            totalAmount: number;
            paymentMethodId: string | null;
            createdAt: Date;
        }[]>;
        payments: (parent: any, _args: unknown, { prisma }: GraphQLContext) => import("@prisma/client").Prisma.PrismaPromise<{
            id: string;
            userId: string;
            createdAt: Date;
            type: string;
        }[]>;
    };
    Restaurant: {
        menus: (parent: any, _args: unknown, { prisma }: GraphQLContext) => import("@prisma/client").Prisma.PrismaPromise<{
            id: string;
            name: string;
            restaurantId: string;
            price: number;
        }[]>;
    };
    Order: {
        user: (parent: any, _args: unknown, { prisma }: GraphQLContext) => import("@prisma/client").Prisma.Prisma__UserClient<{
            id: string;
            phone: string;
            name: string | null;
            role: import("@prisma/client").$Enums.Role;
            country: import("@prisma/client").$Enums.Country;
        } | null, null, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
        restaurant: (parent: any, _args: unknown, { prisma }: GraphQLContext) => import("@prisma/client").Prisma.Prisma__RestaurantClient<{
            id: string;
            name: string;
            country: import("@prisma/client").$Enums.Country;
        } | null, null, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
        items: (parent: any, _args: unknown, { prisma }: GraphQLContext) => import("@prisma/client").Prisma.PrismaPromise<({
            menuItem: {
                id: string;
                name: string;
                restaurantId: string;
                price: number;
            };
        } & {
            id: string;
            orderId: string;
            menuItemId: string;
            quantity: number;
            price: number;
        })[]>;
    };
    OrderItem: {
        menuItem: (parent: any, _args: unknown, { prisma }: GraphQLContext) => import("@prisma/client").Prisma.Prisma__MenuItemClient<{
            id: string;
            name: string;
            restaurantId: string;
            price: number;
        } | null, null, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    };
    PaymentMethod: {
        user: (parent: any, _args: unknown, { prisma }: GraphQLContext) => import("@prisma/client").Prisma.Prisma__UserClient<{
            id: string;
            phone: string;
            name: string | null;
            role: import("@prisma/client").$Enums.Role;
            country: import("@prisma/client").$Enums.Country;
        } | null, null, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    };
};
export default resolvers;
//# sourceMappingURL=resolvers.d.ts.map