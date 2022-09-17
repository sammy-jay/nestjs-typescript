import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../auth.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UsersService } from '../../users/users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import User from '../../users/entity/user.entity';
import { mockedConfigService } from '../../utils/mock/config.service';
import { mockedJwtService } from '../../utils/mock/jwt.service';

describe('AuthService', () => {
  let authService: AuthService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        UsersService,
        {
          provide: ConfigService,
          useValue: mockedConfigService,
        },
        {
          provide: JwtService,
          useValue: mockedJwtService,
        },
        {
          provide: getRepositoryToken(User),
          useValue: {},
        },
      ],
    }).compile();

    authService = await moduleRef.get<AuthService>(AuthService);
  });

  describe('when creating a cookie', () => {
    it('should return a string', () => {
      const payload = { id: 1, email: 'sam@email.com' };
      expect(
        typeof authService.getCookieWithJwtToken(payload.id, payload.email),
      ).toEqual('string');
    });
  });
});
