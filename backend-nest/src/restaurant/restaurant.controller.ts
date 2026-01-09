import { Controller, Get, Req, Query, UseGuards } from '@nestjs/common'
import { RestaurantService } from './restaurant.service'
import { Roles } from '../auth/roles.decorator'
import { RolesGuard } from '../auth/roles.guard'
import { PaginationDto } from '../common/pagination.dto'

@Controller('restaurants')
@UseGuards(RolesGuard)
export class RestaurantController {
  constructor(private service: RestaurantService) {}

  @Get()
  @Roles('ADMIN', 'MANAGER', 'MEMBER')
  getAll(@Req() req: any, @Query() q: PaginationDto) {
    return this.service.findAll(req.user, q.page, q.limit)
  }
}
