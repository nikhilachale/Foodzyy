import { Injectable, ForbiddenException, NotFoundException, BadRequestException } from '@nestjs/common'
import { PrismaService } from '../../prisma/prisma.service'
import { randomUUID } from 'crypto'

interface CartItem {
  menuItemId: string
  quantity: number
}

interface CreateOrderDto {
  restaurantId: string
  items: CartItem[]
}

@Injectable()
export class OrderService {
  constructor(private prisma: PrismaService) {}

  async list(user: any, page = 1, limit = 10) {
    const skip = (page - 1) * limit

    // Users can only see their own orders, ADMIN can see all
    const where = user.role === 'ADMIN' 
      ? {} 
      : { userId: user.id }

    return this.prisma.order.findMany({
      where,
      skip,
      take: limit,
      orderBy: { createdAt: 'desc' },
      include: {
        restaurant: true,
        items: {
          include: {
            menuItem: true,
          },
        },
      },
    })
  }

  async create(user: any, dto?: CreateOrderDto) {
    if (!dto || !dto.restaurantId || !dto.items?.length) {
      // Legacy: create empty order
      return this.prisma.order.create({
        data: {
          id: randomUUID(),
          userId: user.id,
          country: user.country,
          status: 'CREATED',
        },
      })
    }

    // Validate restaurant exists
    const restaurant = await this.prisma.restaurant.findUnique({
      where: { id: dto.restaurantId },
    })
    if (!restaurant) {
      throw new BadRequestException('Restaurant not found')
    }

    // Fetch menu items and calculate total
    const menuItems = await this.prisma.menuItem.findMany({
      where: {
        id: { in: dto.items.map((i) => i.menuItemId) },
        restaurantId: dto.restaurantId,
      },
    })

    if (menuItems.length !== dto.items.length) {
      throw new BadRequestException('Some menu items are invalid')
    }

    const totalAmount = dto.items.reduce((sum, item) => {
      const menuItem = menuItems.find((m) => m.id === item.menuItemId)
      return sum + (menuItem?.price || 0) * item.quantity
    }, 0)

    // Create order with items
    const orderId = randomUUID()
    return this.prisma.order.create({
      data: {
        id: orderId,
        userId: user.id,
        country: user.country,
        status: 'CREATED',
        restaurantId: dto.restaurantId,
        totalAmount,
        items: {
          create: dto.items.map((item) => {
            const menuItem = menuItems.find((m) => m.id === item.menuItemId)
            return {
              id: randomUUID(),
              menuItemId: item.menuItemId,
              quantity: item.quantity,
              price: menuItem?.price || 0,
            }
          }),
        },
      },
      include: {
        restaurant: true,
        items: {
          include: {
            menuItem: true,
          },
        },
      },
    })
  }

  async checkout(user: any, orderId: string) {
    if (user.role === 'MEMBER') {
      throw new ForbiddenException('Members cannot checkout')
    }

    const order = await this.prisma.order.findUnique({ where: { id: orderId } })
    if (!order) throw new NotFoundException()

    if (user.role !== 'ADMIN' && order.country !== user.country) {
      throw new ForbiddenException('Cross-country access denied')
    }

    return this.prisma.order.update({
      where: { id: orderId },
      data: { status: 'PLACED' },
      include: {
        restaurant: true,
        items: {
          include: {
            menuItem: true,
          },
        },
      },
    })
  }

  async cancel(user: any, orderId: string) {
    if (user.role === 'MEMBER') {
      throw new ForbiddenException('Members cannot cancel orders')
    }

    const order = await this.prisma.order.findUnique({ where: { id: orderId } })
    if (!order) throw new NotFoundException()

    if (user.role !== 'ADMIN' && order.country !== user.country) {
      throw new ForbiddenException('Cross-country access denied')
    }

    return this.prisma.order.update({
      where: { id: orderId },
      data: { status: 'CANCELLED' },
      include: {
        restaurant: true,
        items: {
          include: {
            menuItem: true,
          },
        },
      },
    })
  }
}
