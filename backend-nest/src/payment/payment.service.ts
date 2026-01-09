import { Injectable } from '@nestjs/common'
import { PrismaService } from '../../prisma/prisma.service'
import { randomUUID } from 'crypto'

@Injectable()
export class PaymentService {
  constructor(private prisma: PrismaService) {}

  update(user: any, type: string) {
    return this.prisma.paymentMethod.create({
      data: {
        id: randomUUID(),
        type,
        userId: user.id,
      },
    })
  }
}
