import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { PrismaService } from '../../prisma/prisma.service'

interface UpdateProfileDto {
  name: string
  country: 'INDIA' | 'AMERICA'
  role: 'ADMIN' | 'MANAGER' | 'MEMBER'
}

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
  ) {}

  async loginOrSignup(phone: string) {
    // Validate phone number (basic validation - 10 digits)
    const cleanPhone = phone.replace(/\D/g, '')
    if (cleanPhone.length < 10) {
      throw new BadRequestException('Invalid phone number. Must be at least 10 digits.')
    }

    // Try to find user by phone
    let user = await this.prisma.user.findUnique({ where: { phone: cleanPhone } })
    let isNewUser = false

    // If user doesn't exist, create a new one (signup)
    if (!user) {
      user = await this.prisma.user.create({
        data: {
          phone: cleanPhone,
          name: null, // Will be filled in the profile setup
          role: 'MEMBER',
          country: 'INDIA',
        },
      })
      isNewUser = true
    }

    const payload = {
      sub: user.id,
      phone: user.phone,
      role: user.role,
      country: user.country,
    }

    return {
      access_token: this.jwt.sign(payload),
      isNewUser,
      user: {
        id: user.id,
        phone: user.phone,
        name: user.name,
        role: user.role,
        country: user.country,
      },
    }
  }

  async updateProfile(userId: string, dto: UpdateProfileDto) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } })
    if (!user) {
      throw new NotFoundException('User not found')
    }

    const updatedUser = await this.prisma.user.update({
      where: { id: userId },
      data: {
        name: dto.name,
        country: dto.country,
        role: dto.role,
      },
    })

    // Generate new token with updated info
    const payload = {
      sub: updatedUser.id,
      phone: updatedUser.phone,
      role: updatedUser.role,
      country: updatedUser.country,
    }

    return {
      access_token: this.jwt.sign(payload),
      user: {
        id: updatedUser.id,
        phone: updatedUser.phone,
        name: updatedUser.name,
        role: updatedUser.role,
        country: updatedUser.country,
      },
    }
  }
}
