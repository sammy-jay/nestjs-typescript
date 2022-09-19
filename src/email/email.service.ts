import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createTransport } from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';

@Injectable()
export class EmailService {
  private nodemailerTransport: Mail;

  constructor(private readonly configService: ConfigService) {
    this.nodemailerTransport = createTransport({
      service: configService.get('EMAIL_SERVICE'),
      port: configService.get('EMAIL_PORT'),
      auth: {
        user: configService.get('EMAIL_USER'),
        pass: configService.get('EMAIL_PASSWORD'),
      },
      secure: true,
    });
  }

  sendMail(options: Mail.Options) {
    return this.nodemailerTransport.sendMail(options, (err, info) => {
      if (err) {
        console.log(err);
      }
      console.log(info);
    });
  }
}
