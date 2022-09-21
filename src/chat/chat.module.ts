import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { ChatGateway } from './chat.gateway';
import { ChatService } from './chat.service';
import Message from './entity/message.entity';

@Module({
  imports: [AuthModule, TypeOrmModule.forFeature([Message])],
  providers: [ChatService, ChatGateway],
  exports: [ChatService],
})
export class ChatModule {}
