import { RestaurantService } from './restaurant.service';
import { PaginationDto } from '../common/pagination.dto';
export declare class RestaurantController {
    private service;
    constructor(service: RestaurantService);
    getAll(req: any, q: PaginationDto): import(".prisma/client").Prisma.PrismaPromise<({
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
