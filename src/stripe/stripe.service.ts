import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';

@Injectable()
export class StripeService {
  private stripe: Stripe;

  constructor(private readonly configService: ConfigService) {
    this.stripe = new Stripe(configService.get('STRIPE_SECRET_KEY'), {
      apiVersion: '2022-08-01',
    });
  }

  async createCustomer(name: string, email: string) {
    return this.stripe.customers.create({ name, email });
  }

  async charge(amount: number, paymentMethodId?: string, customerId?: string) {
    const paymentIntent = await this.stripe.paymentIntents.create({
      amount,
      // customer: customerId,
      automatic_payment_methods: {
        enabled: true,
      },
      currency: this.configService.get('STRIPE_CURRENCY'),
      // confirm: true,
    });
    return {
      clientSecret: paymentIntent.client_secret,
    };
  }
}
