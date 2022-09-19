import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentsController } from './comments.controller';
import { CqrsModule } from '@nestjs/cqrs';
import { CreateCommentHandler } from './commands/handlers/create-comment.handler';
import Comment from './entity/comment.entity';
import { GetCommentsHandler } from './queries/handlers/get-comments.handler';

@Module({
  imports: [TypeOrmModule.forFeature([Comment]), CqrsModule],
  controllers: [CommentsController],
  providers: [CreateCommentHandler, GetCommentsHandler],
})
export class CommentsModule {}
