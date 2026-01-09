import { AuthService } from './auth.service';
export declare class AuthController {
    private service;
    constructor(service: AuthService);
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
    updateProfile(req: any, body: {
        name: string;
        country: 'INDIA' | 'AMERICA';
        role: 'ADMIN' | 'MANAGER' | 'MEMBER';
    }): Promise<{
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
