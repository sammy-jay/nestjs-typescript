import {
  Controller,
  UseGuards,
  Post,
  Req,
  BadRequestException,
  Body,
} from '@nestjs/common';
import { JwtGuard } from 'src/auth/guard/jwt.guard';
import { RequestUser } from 'src/auth/interface/request-user.interface';
import { CheckVerificationCodeDto } from './dto/check-verification-code.dto';
import { SendMessageDto } from './dto/send-message.dto';
import { SmsService } from './sms.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('sms')
@ApiTags('sms')
@UseGuards(JwtGuard)
export class SmsController {
  constructor(private readonly smsService: SmsService) {}

  @Post('initiate-verification')
  async initiatePhoneNumberVerification(@Req() request: RequestUser) {
    if (request.user.isPhoneNumberConfirmed) {
      throw new BadRequestException('Phone number already confirmed');
    }
    await this.smsService.initiatePhoneNumberVerification(
      request.user.phoneNumber,
    );
  }

  @Post('check-verification-code')
  async checkVerificationCode(
    @Req() request: RequestUser,
    @Body() verificationData: CheckVerificationCodeDto,
  ) {
    if (request.user.isPhoneNumberConfirmed) {
      throw new BadRequestException('Phone number already confirmed');
    }
    await this.smsService.confirmPhoneNumber(
      request.user.id,
      request.user.phoneNumber,
      verificationData.code,
    );
  }

  @Post('send-message')
  async sendMessage(
    @Req() request: RequestUser,
    @Body() messageBody: SendMessageDto,
  ) {
    await this.smsService.sendMessage(
      messageBody.receiverPhoneNumber,
      messageBody.message,
    );
  }
}
