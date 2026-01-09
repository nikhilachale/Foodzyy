import { PrismaService } from '../../prisma/prisma.service';
interface CartItem {
    menuItemId: string;
    quantity: number;
}
interface CreateOrderDto {
    restaurantId: string;
    items: CartItem[];
}
export declare class OrderService {
    private prisma;
    constructor(prisma: PrismaService);
    list(user: any, page?: number, limit?: number): Promise<({
        restaurant: {
            id: string;
            name: string;
            country: import(".prisma/client").$Enums.Country;
        } | null;
        items: ({
            menuItem: {
                id: string;
                name: string;
                price: number;
                restaurantId: string;
            };
        } & {
            id: string;
            price: number;
            quantity: number;
            orderId: string;
            menuItemId: string;
        })[];
    } & {
        id: string;
        country: import(".prisma/client").$Enums.Country;
        userId: string;
        status: import(".prisma/client").$Enums.OrderStatus;
        restaurantId: string | null;
        totalAmount: number;
        createdAt: Date;
    })[]>;
    create(user: any, dto?: CreateOrderDto): Promise<{
        id: string;
        country: import(".prisma/client").$Enums.Country;
        userId: string;
        status: import(".prisma/client").$Enums.OrderStatus;
        restaurantId: string | null;
        totalAmount: number;
        createdAt: Date;
    }>;
    checkout(user: any, orderId: string): Promise<{
        restaurant: {
            id: string;
            name: string;
            country: import(".prisma/client").$Enums.Country;
        } | null;
        items: ({
            menuItem: {
                id: string;
                name: string;
                price: number;
                restaurantId: string;
            };
        } & {
            id: string;
            price: number;
            quantity: number;
            orderId: string;
            menuItemId: string;
        })[];
    } & {
        id: string;
        country: import(".prisma/client").$Enums.Country;
        userId: string;
        status: import(".prisma/client").$Enums.OrderStatus;
        restaurantId: string | null;
        totalAmount: number;
        createdAt: Date;
    }>;
    cancel(user: any, orderId: string): Promise<{
        restaurant: {
            id: string;
            name: string;
            country: import(".prisma/client").$Enums.Country;
        } | null;
        items: ({
            menuItem: {
                id: string;
                name: string;
                price: number;
                restaurantId: string;
            };
        } & {
            id: string;
            price: number;
            quantity: number;
            orderId: string;
            menuItemId: string;
        })[];
    } & {
        id: string;
        country: import(".prisma/client").$Enums.Country;
        userId: string;
        status: import(".prisma/client").$Enums.OrderStatus;
        restaurantId: string | null;
        totalAmount: number;
        createdAt: Date;
    }>;
}
export {};
