import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { RegistrationDto } from './dto';
import { JwtGuard } from './guard/jwt.guard';
import { LocalGuard } from './guard/local.guard';
import { RequestUser } from './interface/request-user.interface';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(200)
  @UseGuards(JwtGuard)
  @Get('profile')
  async profile(@Req() request: RequestUser) {
    return request.user;
  }

  @Post('register')
  async register(@Body() registrationData: RegistrationDto) {
    return await this.authService.register(registrationData);
  }

  @HttpCode(200)
  @UseGuards(LocalGuard)
  @Post('login')
  async login(@Req() request: RequestUser, @Res() response: Response) {
    const user = request.user;

    const cookie = this.authService.getCookieWithJwtToken(user.id, user.email);
    response.setHeader('Set-Cookie', cookie);
    return response.send(user);
  }

  @HttpCode(200)
  @UseGuards(JwtGuard)
  @Get('logout')
  async logout(@Req() request: RequestUser, @Res() response: Response) {
    const cookie = this.authService.getCookieForLogout();
    response.setHeader('Set-Cookie', cookie);
    return response.send();
  }
}
