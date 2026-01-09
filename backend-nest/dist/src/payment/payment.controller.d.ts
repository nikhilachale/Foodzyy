import { PaymentService } from './payment.service';
export declare class PaymentController {
    private service;
    constructor(service: PaymentService);
    update(req: any, type: string): import(".prisma/client").Prisma.Prisma__PaymentMethodClient<{
        id: string;
        userId: string;
        type: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
}
