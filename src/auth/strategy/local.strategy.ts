import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import User from 'src/users/entity/user.entity';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'email',
    });
  }

  async validate(email: string, password: string): Promise<User> {
    const user = await this.authService.getAuthenticatedUser(email, password);
    if (!user) {
      throw new HttpException(
        'Wrong credentials provided.',
        HttpStatus.BAD_REQUEST,
      );
    }
    return user;
  }
}
