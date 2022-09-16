import { Global, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import User from './entity/user.entity';
import Address from './entity/address.entity';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([User, Address])],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
