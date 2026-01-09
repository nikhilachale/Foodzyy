import { OrderService } from './order.service';
import { PaginationDto } from '../common/pagination.dto';
export declare class OrderController {
    private service;
    constructor(service: OrderService);
    list(req: any, q: PaginationDto): Promise<({
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
    create(req: any): Promise<{
        id: string;
        country: import(".prisma/client").$Enums.Country;
        userId: string;
        status: import(".prisma/client").$Enums.OrderStatus;
        restaurantId: string | null;
        totalAmount: number;
        createdAt: Date;
    }>;
    checkout(req: any, id: string): Promise<{
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
    cancel(req: any, id: string): Promise<{
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
