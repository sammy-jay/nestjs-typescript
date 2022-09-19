import CreateCommentDto from 'src/comments/dto/create-comment.dto';
import User from 'src/users/entity/user.entity';

export class CreateCommentCommand {
  constructor(
    public readonly comment: CreateCommentDto,
    public readonly author: User,
  ) {}
}
