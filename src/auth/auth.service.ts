import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { RegistrationDto } from './dto';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { PostgresErrorCode } from '../constants/postgres-error-codes.enum';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { TokenPayload } from './interface/token-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async register(registrationData: RegistrationDto) {
    const hashedPassword = await bcrypt.hash(registrationData.password, 10);
    try {
      const createdUser = await this.usersService.create({
        ...registrationData,
        address: { ...registrationData.address },
        password: hashedPassword,
      });
      return createdUser;
    } catch (error) {
      if (error?.code === PostgresErrorCode.UniqueViolation) {
        throw new HttpException(
          'User with that email already exists.',
          HttpStatus.BAD_REQUEST,
        );
      }
      throw new HttpException(
        'Something went wrong.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getAuthenticatedUser(email: string, password: string) {
    try {
      const user = await this.usersService.getByEmail(email);
      await this.verifyPassword(password, user.password);
      return user;
    } catch (error) {
      throw new HttpException(
        'Wrong credentials provided.',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  private async verifyPassword(inputPassword: string, userHash: string) {
    const isPasswordMatch = await bcrypt.compare(inputPassword, userHash);
    if (!isPasswordMatch) {
      throw new HttpException(
        'Wrong credentials provided.',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  getCookieWithJwtToken(id: number, is2FAunthenticated = false) {
    const payload: TokenPayload = { id, is2FAunthenticated };
    const expTime = this.configService.get('JWT_ACCESS_TOKEN_EXPIRATION_TIME');
    const token = this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_ACCESS_TOKEN_SECRET'),
      expiresIn: expTime,
    });
    return `Authentication=${token}; HttpOnly; Path=/; Max-Age=${expTime}`;
  }

  async getCookieWithJwtRefreshToken(id: number, is2FAunthenticated = false) {
    const payload: TokenPayload = { id, is2FAunthenticated };
    const expTime = this.configService.get('JWT_REFRESH_TOKEN_EXPIRATION_TIME');
    const refreshToken = this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_REFRESH_TOKEN_SECRET'),
      expiresIn: `${expTime}`,
    });

    const refreshTokenCookie = `Refresh=${refreshToken}; HttpOnly; Path=/; Max-Age=${expTime}`;
    return {
      refreshTokenCookie,
      refreshToken,
    };
  }

  getCookiesForLogout() {
    return [
      'Authentication=; HttpOnly; Path=/; Max-Age=0',
      'Refresh=; HttpOnly; Path=/; Max-Age=0',
    ];
  }

  async getUserFromAuthenticationToken(token: string) {
    const payload: TokenPayload = this.jwtService.verify(token, {
      secret: this.configService.get('JWT_ACCESS_TOKEN_SECRET'),
    });
    if (payload.id) {
      return this.usersService.getById(payload.id);
    }
  }
}
