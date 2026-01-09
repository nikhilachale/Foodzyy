import { Injectable } from '@nestjs/common'
import { PrismaService } from '../../prisma/prisma.service'

@Injectable()
export class RestaurantService {
  constructor(private prisma: PrismaService) {}

  findAll(user: any, page = 1, limit = 10) {
    const skip = (page - 1) * limit

    const where = user.role === 'ADMIN' ? {} : { country: user.country }

    return this.prisma.restaurant.findMany({
      where,
      skip,
      take: limit,
      include: { menus: true },
    })
  }
}
