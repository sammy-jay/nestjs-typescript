import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UsersModule } from 'src/users/users.module';
import { AuthService } from '../auth.service';
import { TwoFactorAuthController } from './two-factor-auth.controller';
import { TwoFactorAuthService } from './two-factor-auth.service';

@Module({
  imports: [UsersModule, ConfigModule],
  controllers: [TwoFactorAuthController],
  providers: [TwoFactorAuthService, AuthService, JwtService],
})
export class TwoFactorAuthModule {}
