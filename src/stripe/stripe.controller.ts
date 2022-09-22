import { Controller, Post, Body, Req, UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/auth/guard/jwt.guard';
import { RequestUser } from 'src/auth/interface/request-user.interface';
import { StripeService } from './stripe.service';
import { CreateChargeDto } from './dto/create-charge.dto';

@Controller('stripe')
export class StripeController {
  constructor(private readonly stripeService: StripeService) {}

  @Post('create-payment-intent')
  @UseGuards(JwtGuard)
  async createCharge(@Body() charge: any, @Req() request: RequestUser) {
    console.log(charge);
    return await this.stripeService.charge(
      200,
      // charge.amount,
      // charge.paymentMethodId,
      // request.user.stripeCustomerId,
    );
  }
}
