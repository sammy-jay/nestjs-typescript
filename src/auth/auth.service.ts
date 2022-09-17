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

  getCookieWithJwtToken(id: number, email: string) {
    const payload: TokenPayload = { id, email };
    const token = this.jwtService.sign(payload);
    const expTime = this.configService.get('JWT_EXPIRATION_TIME');

    return `Authentication=${token}; HttpOnly; Path=/; Max-Age=${expTime}`;
  }

  getCookieForLogout() {
    return `Authentication=; HttpOnly; Path=/; Max-Age=0`;
  }
}
