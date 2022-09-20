import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GraphqlJwtGuard } from 'src/auth/guard/graphql-jwt.guard';
import { RequestUser } from 'src/auth/interface/request-user.interface';
import { CreatePostInput } from './input/post.input';
import { Post } from './model/post.model';
import { PostsService } from './posts.service';

@Resolver(() => Post)
// @UseGuards(GraphqlJwtGuard)
export class PostsResolver {
  constructor(private readonly postsService: PostsService) {}

  @Query(() => [Post])
  async getAllPosts() {
    const posts = await this.postsService.getAllPosts();
    return posts.items;
  }

  @Query(() => Post)
  async getPostById(@Args('id') id: number) {
    const posts = await this.postsService.getPostById(id);
    return posts;
  }

  @Mutation(() => Post)
  async createPost(
    @Args('createPostInput') createPostInput: CreatePostInput,
    @Context() context: { req: RequestUser },
  ) {
    return this.postsService.createPost(createPostInput, context.req.user);
  }
}
