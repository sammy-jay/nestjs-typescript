import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { RegistrationDto } from './dto';
import * as bcrypt from 'bcrypt';
import { PostgresErrorCode } from 'src/constants/postgres-error-codes.enum';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async register(registrationData: RegistrationDto) {
    const hashedPassword = await bcrypt.hash(registrationData.password, 10);
    try {
      const createdUser = await this.usersService.create({
        ...registrationData,
        password: hashedPassword,
      });

      delete createdUser.password;
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
      delete user.password;
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
}
