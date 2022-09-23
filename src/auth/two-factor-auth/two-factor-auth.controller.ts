import {
  Controller,
  Post,
  Res,
  UseGuards,
  Req,
  UnauthorizedException,
  HttpCode,
  Body,
  BadRequestException,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { UsersService } from 'src/users/users.service';
import { AuthService } from '../auth.service';
import { JwtGuard } from '../guard/jwt.guard';
import { RequestUser } from '../interface/request-user.interface';
import { TwoFactorAuthCodeDto } from './dto/two-factor-auth-code.dto';
import { TwoFactorAuthService } from './two-factor-auth.service';

@Controller('2fa')
@ApiTags('2fa')
@UseGuards(JwtGuard)
export class TwoFactorAuthController {
  constructor(
    private readonly twoFactorAuthService: TwoFactorAuthService,
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @Post('generate')
  async register(@Res() response: Response, @Req() request: RequestUser) {
    const { otpauthUrl } =
      await this.twoFactorAuthService.generateTwoFactorAuthenticationSecret(
        request.user,
      );

    return this.twoFactorAuthService.pipeQrCodeStream(response, otpauthUrl);
  }

  @Post('turn-on')
  @HttpCode(200)
  async turnOnTwoFactorAuthentication(
    @Req() request: RequestUser,
    @Body() { twoFactorAuthCode }: TwoFactorAuthCodeDto,
  ) {
    const isCodeValid =
      this.twoFactorAuthService.isTwoFactorAuthenticationCodeValid(
        twoFactorAuthCode,
        request.user,
      );
    if (!isCodeValid) {
      throw new UnauthorizedException('Wrong authentication code');
    }
    await this.usersService.turnOnTwoFactorAuthentication(request.user.id);
  }

  @Post('authenticate')
  @HttpCode(200)
  async authenticate(
    @Req() request: RequestUser,
    @Body() { twoFactorAuthCode }: TwoFactorAuthCodeDto,
  ) {
    const isCodeValid =
      this.twoFactorAuthService.isTwoFactorAuthenticationCodeValid(
        twoFactorAuthCode,
        request.user,
      );
    if (!isCodeValid) {
      throw new UnauthorizedException('Wrong authentication code');
    }
    if (!request.user.isTwoFactorAuthenticationEnabled) {
      throw new BadRequestException(
        'Please turn-on 2FA before authenticating with it',
      );
    }
    const accessTokenCookie = this.authService.getCookieWithJwtToken(
      request.user.id,
      true,
    );

    request.res.setHeader('Set-Cookie', [accessTokenCookie]);

    return request.user;
  }
}
