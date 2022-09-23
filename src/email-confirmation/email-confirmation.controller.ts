import { Controller, Get, Post, Query, Req, UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/auth/guard/jwt.guard';
import { RequestUser } from 'src/auth/interface/request-user.interface';
import { EmailConfirmationService } from './email-confirmation.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('email-confirmation')
@ApiTags('email-confirmation')
export class EmailConfirmationController {
  constructor(
    private readonly emailConfirmationService: EmailConfirmationService,
  ) {}

  @Get('confirm')
  async confirm(@Query('token') token: string) {
    const email = await this.emailConfirmationService.decodeConfirmationToken(
      token,
    );
    await this.emailConfirmationService.confirmEmail(email);
  }

  @Post('resend-confirmation-link')
  @UseGuards(JwtGuard)
  async resendConfirmationLink(@Req() request: RequestUser) {
    await this.emailConfirmationService.resendConfirmationLink(request.user.id);
  }
}
