import { Controller, Get, Post, Param, Req, Query, UseGuards } from '@nestjs/common'
import { OrderService } from './order.service'
import { Roles } from '../auth/roles.decorator'
import { RolesGuard } from '../auth/roles.guard'
import { PaginationDto } from '../common/pagination.dto'

@Controller('orders')
@UseGuards(RolesGuard)
export class OrderController {
  constructor(private service: OrderService) {}

  @Get()
  @Roles('ADMIN', 'MANAGER', 'MEMBER')
  list(@Req() req: any, @Query() q: PaginationDto) {
    return this.service.list(req.user, q.page, q.limit)
  }

  @Post()
  @Roles('ADMIN', 'MANAGER', 'MEMBER')
  create(@Req() req: any) {
    return this.service.create(req.user)
  }

  @Post(':id/checkout')
  @Roles('ADMIN', 'MANAGER')
  checkout(@Req() req: any, @Param('id') id: string) {
    return this.service.checkout(req.user, id)
  }

  @Post(':id/cancel')
  @Roles('ADMIN', 'MANAGER')
  cancel(@Req() req: any, @Param('id') id: string) {
    return this.service.cancel(req.user, id)
  }
}
