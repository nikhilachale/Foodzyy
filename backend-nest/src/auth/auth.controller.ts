import { Controller, Post, Put, Body, Req, BadRequestException } from '@nestjs/common'
import { AuthService } from './auth.service'
import { Public } from './public.decorator'

@Controller('auth')
export class AuthController {
  constructor(private service: AuthService) {}

  @Public()
  @Post('login')
  loginOrSignup(@Body('phone') phone: string) {
    if (!phone) {
      throw new BadRequestException('Phone number is required')
    }
    return this.service.loginOrSignup(phone)
  }

  @Put('profile')
  updateProfile(
    @Req() req: any,
    @Body() body: { name: string; country: 'INDIA' | 'AMERICA'; role: 'ADMIN' | 'MANAGER' | 'MEMBER' }
  ) {
    if (!body.name || !body.country || !body.role) {
      throw new BadRequestException('Name, country, and role are required')
    }
    return this.service.updateProfile(req.user.id, body)
  }
}