import { Controller, Put, Body, Req, UseGuards } from '@nestjs/common'
import { PaymentService } from './payment.service'
import { Roles } from '../auth/roles.decorator'
import { RolesGuard } from '../auth/roles.guard'

@Controller('payment')
@UseGuards(RolesGuard)
export class PaymentController {
  constructor(private service: PaymentService) {}

  @Put()
  @Roles('ADMIN')
  update(@Req() req: any, @Body('type') type: string) {
    return this.service.update(req.user, type)
  }
}
