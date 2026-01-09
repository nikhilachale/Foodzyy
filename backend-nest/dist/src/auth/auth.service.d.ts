import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../../prisma/prisma.service';
interface UpdateProfileDto {
    name: string;
    country: 'INDIA' | 'AMERICA';
    role: 'ADMIN' | 'MANAGER' | 'MEMBER';
}
export declare class AuthService {
    private prisma;
    private jwt;
    constructor(prisma: PrismaService, jwt: JwtService);
    loginOrSignup(phone: string): Promise<{
        access_token: string;
        isNewUser: boolean;
        user: {
            id: string;
            phone: string;
            name: string | null;
            role: import(".prisma/client").$Enums.Role;
            country: import(".prisma/client").$Enums.Country;
        };
    }>;
    updateProfile(userId: string, dto: UpdateProfileDto): Promise<{
        access_token: string;
        user: {
            id: string;
            phone: string;
            name: string | null;
            role: import(".prisma/client").$Enums.Role;
            country: import(".prisma/client").$Enums.Country;
        };
    }>;
}
export {};
