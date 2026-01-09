import { PrismaService } from '../../prisma/prisma.service';
export declare class PaymentService {
    private prisma;
    constructor(prisma: PrismaService);
    update(user: any, type: string): import(".prisma/client").Prisma.Prisma__PaymentMethodClient<{
        id: string;
        userId: string;
        type: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
}
