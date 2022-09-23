import { Controller, Post, Body, Req, UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/auth/guard/jwt.guard';
import { RequestUser } from 'src/auth/interface/request-user.interface';
import { StripeService } from './stripe.service';
import { CreateIntentDto } from './dto/create-charge.dto';

@Controller('stripe')
export class StripeController {
  constructor(private readonly stripeService: StripeService) {}

  @Post('create-payment-intent')
  // @UseGuards(JwtGuard)
  async createCharge(@Body() intentData: CreateIntentDto) {
    const amount = await this.stripeService.getAmount(intentData.items);
    return await this.stripeService.charge(Number(amount.toFixed(0)));
  }
}