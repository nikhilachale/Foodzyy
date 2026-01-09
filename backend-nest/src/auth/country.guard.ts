import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'

@Injectable()
export class CountryGuard implements CanActivate {
  canActivate(ctx: ExecutionContext): boolean {
    const req = ctx.switchToHttp().getRequest()
    const user = req.user
    const resourceCountry = req.resourceCountry
    if (!resourceCountry) return true
    if (user.role === 'ADMIN') return true
    return user.country === resourceCountry
  }
}
