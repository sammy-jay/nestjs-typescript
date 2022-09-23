import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { JwtGuard } from 'src/auth/guard/jwt.guard';
import { RequestUser } from 'src/auth/interface/request-user.interface';
import { CreateCommentCommand } from './commands/implementation/create-comment.command';
import CreateCommentDto from './dto/create-comment.dto';
import GetCommentsDto from './dto/get-comments.dto';
import { GetCommentsQuery } from './queries/implementation/get-comments.query';
import { ApiTags } from '@nestjs/swagger';

@Controller('comments')
@ApiTags('comments')
@UseGuards(JwtGuard)
export class CommentsController {
  constructor(private commandBus: CommandBus, private queryBus: QueryBus) {}

  @Post()
  async createComment(
    @Body() comment: CreateCommentDto,
    @Req() req: RequestUser,
  ) {
    const user = req.user;
    return this.commandBus.execute(new CreateCommentCommand(comment, user));
  }

  @Get()
  async getComments(@Query() { postId }: GetCommentsDto) {
    return this.queryBus.execute(new GetCommentsQuery(postId));
  }
}
