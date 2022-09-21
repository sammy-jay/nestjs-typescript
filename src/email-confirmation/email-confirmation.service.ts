import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { EmailService } from 'src/email/email.service';
import { VerificationTokenPayload } from './interface/verification-payload.interface';
import * as handlebars from 'handlebars';
import * as fs from 'fs';
import { join } from 'path';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class EmailConfirmationService {
  constructor(
    private readonly emailService: EmailService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly usersService: UsersService,
  ) {}

  async sendVerificationLink(email: string) {
    const payload: VerificationTokenPayload = { email };
    const verificationToken = this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_VERIFICATION_TOKEN_SECRET'),
      expiresIn: this.configService.get(
        'JWT_VERIFICATION_TOKEN_EXPIRATION_TIME',
      ),
    });

    const url = `${this.configService.get(
      'EMAIL_CONFIRMATION_URL',
    )}?token=${verificationToken}`;

    const filepath = join(
      __dirname,
      '../../src/email/template/email-verification.template.html',
    );
    const source = fs.readFileSync(filepath, 'utf8').toString();
    const template = handlebars.compile(source);
    const replacements = { url };
    const htmlToSend = template(replacements);

    return this.emailService.sendMail({
      from: 'My App <my-app@domain.com>',
      to: email,
      subject: 'Email confirmation',
      html: htmlToSend,
    });
  }

  async resendConfirmationLink(id: number) {
    const user = await this.usersService.getById(id);
    if (user.isEmailConfirmed) {
      throw new BadRequestException('Email already confirmed');
    }
    await this.sendVerificationLink(user.email);
  }

  async decodeConfirmationToken(token: string) {
    try {
      const payload = await this.jwtService.verify(token, {
        secret: this.configService.get('JWT_VERIFICATION_TOKEN_SECRET'),
      });

      if (typeof payload === 'object' && 'email' in payload) {
        return payload.email;
      }
      throw new BadRequestException();
    } catch (error) {
      if (error?.name === 'TokenExpiredError') {
        throw new BadRequestException('Email confirmation token expired');
      }
      throw new BadRequestException('Bad confirmation token');
    }
  }

  async confirmEmail(email: string) {
    const user = await this.usersService.getByEmail(email);
    if (user.isEmailConfirmed) {
      throw new BadRequestException('Email is already confirmed.');
    }
    await this.usersService.markEmailAsConfirmed(email);
  }
}
