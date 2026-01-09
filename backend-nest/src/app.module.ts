import { MiddlewareConsumer, Module } from '@nestjs/common'
import { PrismaModule } from '../prisma/prisma.module'
import { AuthModule } from './auth/auth.module'
import { RestaurantModule } from './restaurant/restaurant.module'
import { MockUserMiddleware } from './auth/mock-user.middleware'
import { OrderModule } from './order/order.module'
import { PaymentModule } from './payment/payment.module'

@Module({
  imports: [PrismaModule, AuthModule, RestaurantModule, OrderModule, PaymentModule],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(MockUserMiddleware).forRoutes('*')
  }
}