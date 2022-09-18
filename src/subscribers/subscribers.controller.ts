import {
  Body,
  Controller,
  Get,
  Inject,
  InternalServerErrorException,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { JwtGuard } from 'src/auth/guard/jwt.guard';
import { CreateSubscriberDto } from './dto/create-subscriber.dto';

@Controller('subscribers')
@UseGuards(JwtGuard)
export class SubscribersController {
  constructor(
    @Inject('SUBSCRIBERS_SERVICE') private subscribersClient: ClientProxy,
  ) {}

  @Get()
  async getAllSubscribers() {
    try {
      return await this.subscribersClient.send(
        {
          cmd: 'get-all-subscribers',
        },
        '',
      );
    } catch (error) {
      return error;
    }
  }

  @Post()
  async addSubscriber(@Body() subscriber: CreateSubscriberDto) {
    try {
      return await this.subscribersClient.send(
        {
          cmd: 'add-subscriber',
        },
        subscriber,
      );
    } catch (error) {
      return error;
    }
  }

  //   @Post()
  //   async addSubscriber(@Body() subscriber: CreateSubscriberDto) {
  //     return await this.subscribersClient.emit(
  //       {
  //         cmd: 'add-subscriber',
  //       },
  //       subscriber,
  //     );
  //   }
}
