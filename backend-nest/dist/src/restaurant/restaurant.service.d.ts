import { PrismaService } from '../../prisma/prisma.service';
export declare class RestaurantService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(user: any, page?: number, limit?: number): import(".prisma/client").Prisma.PrismaPromise<({
        menus: {
            id: string;
            name: string;
            price: number;
            restaurantId: string;
        }[];
    } & {
        id: string;
        name: string;
        country: import(".prisma/client").$Enums.Country;
    })[]>;
}
