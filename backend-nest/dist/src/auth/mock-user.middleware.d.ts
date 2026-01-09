import { NestMiddleware } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
export declare class MockUserMiddleware implements NestMiddleware {
    private prisma;
    constructor(prisma: PrismaService);
    use(req: any, _: any, next: () => void): Promise<void>;
}
