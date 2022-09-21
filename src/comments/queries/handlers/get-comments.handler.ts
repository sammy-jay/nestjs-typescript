import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GetCommentsQuery } from '../implementation/get-comments.query';
import Comment from '../../entity/comment.entity';
import { NotFoundException } from '@nestjs/common';

@QueryHandler(GetCommentsQuery)
export class GetCommentsHandler implements IQueryHandler<GetCommentsQuery> {
  constructor(
    @InjectRepository(Comment)
    private commentsRepository: Repository<Comment>,
  ) {}

  async execute(query: GetCommentsQuery) {
    if (query.postId) {
      const comment = await this.commentsRepository.findOne({
        where: {
          post: {
            id: query.postId,
          },
        },
      });
      if (comment) {
        return comment;
      }
      throw new NotFoundException(
        'Comment with id ' + query.postId + ' not found',
      );
    }
    return await this.commentsRepository.find();
  }
}
