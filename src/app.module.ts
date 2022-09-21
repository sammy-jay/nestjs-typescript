import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from '@hapi/joi';
import { PostsModule } from './posts/posts.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { APP_FILTER } from '@nestjs/core';
import { ExceptionLoggerFilter } from './utils/exceptions-logger.filter';
import { CategoriesModule } from './categories/categories.module';
import { DatabaseModule } from './database/database.module';
import { PublicFilesModule } from './public-files/public-files.module';
import { PrivateFilesModule } from './private-files/private-files.module';
import { SearchModule } from './search/search.module';
import { SubscribersModule } from './subscribers/subscribers.module';
import { CommentsModule } from './comments/comments.module';
import { EmailModule } from './email/email.module';
import { EmailSchedulingModule } from './email-scheduling/email-scheduling.module';
import { ScheduleModule } from '@nestjs/schedule';
import { ChatModule } from './chat/chat.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver } from '@nestjs/apollo';
import { join } from 'path';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';
import { BullModule } from '@nestjs/bull';
import { OptimizeModule } from './optimize/optimize.module';
import { EmailConfirmationModule } from './email-confirmation/email-confirmation.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { SmsModule } from './sms/sms.module';

@Module({
  imports: [
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      autoSchemaFile: true,
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault],
    }),
    MailerModule.forRoot({
      transport: {
        host: 'localhost',
        port: 1025,
        ignoreTLS: true,
        secure: false,
      },
    }),
    BullModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        redis: {
          host: configService.get('REDIS_HOST'),
          port: Number(configService.get('REDIS_PORT')),
        },
      }),
    }),
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        POSTGRES_HOST: Joi.string().required(),
        POSTGRES_PORT: Joi.number().required(),
        POSTGRES_USER: Joi.string().required(),
        POSTGRES_PASSWORD: Joi.string().required(),
        POSTGRES_DB: Joi.string().required(),
        JWT_ACCESS_TOKEN_SECRET: Joi.string().required(),
        JWT_ACCESS_TOKEN_EXPIRATION_TIME: Joi.string().required(),
        JWT_REFRESH_TOKEN_SECRET: Joi.string().required(),
        JWT_REFRESH_TOKEN_EXPIRATION_TIME: Joi.string().required(),
        SUBSCRIBERS_SERVICE_HOST: Joi.string().required(),
        SUBSCRIBERS_SERVICE_PORT: Joi.number().required(),
        REDIS_HOST: Joi.string().required(),
        REDIS_PORT: Joi.number().required(),
        EMAIL_SERVICE: Joi.string().required(),
        EMAIL_PORT: Joi.number().required(),
        EMAIL_USER: Joi.string().required(),
        EMAIL_PASSWORD: Joi.string().required(),
        JWT_VERIFICATION_TOKEN_SECRET: Joi.string().required(),
        JWT_VERIFICATION_TOKEN_EXPIRATION_TIME: Joi.string().required(),
        EMAIL_CONFIRMATION_URL: Joi.string().required(),
        TWO_FACTOR_AUTHENTICATION_APP_NAME: Joi.string().required(),
        TWILIO_ACCOUNT_SID: Joi.string().required(),
        TWILIO_AUTH_TOKEN: Joi.string().required(),
        TWILIO_VERIFICATION_SERVICE_SID: Joi.string().required(),
        TWILIO_SENDER_PHONE_NUMBER: Joi.string().required(),
        PORT: Joi.number(),
      }),
    }),
    PostsModule,
    ScheduleModule.forRoot(),
    DatabaseModule,
    UsersModule,
    AuthModule,
    CategoriesModule,
    PublicFilesModule,
    PrivateFilesModule,
    SearchModule,
    SubscribersModule,
    CommentsModule,
    EmailModule,
    EmailSchedulingModule,
    ChatModule,
    OptimizeModule,
    EmailConfirmationModule,
    SmsModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: ExceptionLoggerFilter,
    },
  ],
})
export class AppModule {}
