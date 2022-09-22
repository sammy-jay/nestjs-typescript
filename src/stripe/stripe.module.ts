import { Module } from '@nestjs/common';
import { StripeService } from './stripe.service';
import { ConfigModule } from '@nestjs/config';
import { StripeController } from './stripe.controller';

@Module({
  imports: [ConfigModule],
  providers: [StripeService],
  exports: [StripeService],
  controllers: [StripeController],
})
export class StripeModule {}
