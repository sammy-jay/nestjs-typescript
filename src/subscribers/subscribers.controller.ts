import {
  Body,
  Controller,
  Get,
  Inject,
  OnModuleInit,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ClientGrpc, ClientProxy } from '@nestjs/microservices';
import { JwtGuard } from 'src/auth/guard/jwt.guard';
import { CreateSubscriberDto } from './dto/create-subscriber.dto';
import SubscribersService from './interface/subscribers.service.interface';

@Controller('subscribers')
@UseGuards(JwtGuard)
export class SubscribersController implements OnModuleInit {
  private subscribersService: SubscribersService;

  constructor(@Inject('SUBSCRIBERS_PACKAGE') private client: ClientGrpc) {}

  onModuleInit() {
    this.subscribersService =
      this.client.getService<SubscribersService>('SubscribersService');
  }

  @Get()
  async getAllSubscribers() {
    return this.subscribersService.getAllSubscribers({});
  }

  @Post()
  async addSubscriber(@Body() subscriber: CreateSubscriberDto) {
    return this.subscribersService.addSubscriber(subscriber);
  }
}
