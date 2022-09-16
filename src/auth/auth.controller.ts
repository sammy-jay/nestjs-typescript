import {
  Body,
  Controller,
  HttpCode,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegistrationDto } from './dto';
import { LocalGuard } from './guard/local.guard';
import { RequestUser } from './interface/request-user.interface';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() registrationData: RegistrationDto) {
    return await this.authService.register(registrationData);
  }

  @HttpCode(200)
  @UseGuards(LocalGuard)
  @Post('login')
  async login(@Req() request: RequestUser) {
    const user = request.user;
    return user;
  }
}
