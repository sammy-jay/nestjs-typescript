import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import Post from './entity/post.entity';
import { SearchModule } from 'src/search/search.module';
import PostsSearchService from './post-search.service';

@Module({
  imports: [TypeOrmModule.forFeature([Post]), SearchModule],
  providers: [PostsService, PostsSearchService],
  controllers: [PostsController],
})
export class PostsModule {}
