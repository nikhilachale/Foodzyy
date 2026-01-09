import { Injectable, NestMiddleware } from '@nestjs/common'
import { PrismaService } from '../../prisma/prisma.service'

@Injectable()
export class MockUserMiddleware implements NestMiddleware {
  constructor(private prisma: PrismaService) {}

  async use(req: any, _: any, next: () => void) {
    const userId = req.headers['x-user-id']
    if (userId) {
      req.user = await this.prisma.user.findUnique({
        where: { id: userId },
      })
    }
    next()
  }
}
