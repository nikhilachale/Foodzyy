import { CanActivate, ExecutionContext } from '@nestjs/common';
export declare class CountryGuard implements CanActivate {
    canActivate(ctx: ExecutionContext): boolean;
}
