import { Request, Response, NextFunction } from "express";
export interface AuthUser {
    id: string;
    phone: string;
    name: string | null;
    role: "ADMIN" | "MANAGER" | "MEMBER";
    country: "INDIA" | "AMERICA";
}
export interface AuthRequest extends Request {
    user?: AuthUser;
}
export declare function authMiddleware(req: AuthRequest, res: Response, next: NextFunction): Response<any, Record<string, any>> | undefined;
export declare function requireRoles(...roles: string[]): (req: AuthRequest, res: Response, next: NextFunction) => Response<any, Record<string, any>> | undefined;
//# sourceMappingURL=auth.d.ts.map