import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EmailService } from './email.service';

@Module({
  imports: [ConfigModule, MailerModule],
  providers: [EmailService],
  exports: [EmailService],
})
export class EmailModule {}
