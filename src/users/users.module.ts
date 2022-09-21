import { Global, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import User from './entity/user.entity';
import Address from './entity/address.entity';
import { PublicFilesModule } from 'src/public-files/public-files.module';
import { PrivateFilesModule } from 'src/private-files/private-files.module';
import { EmailModule } from 'src/email/email.module';

@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([User, Address]),
    PublicFilesModule,
    PrivateFilesModule,
    EmailModule,
  ],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
