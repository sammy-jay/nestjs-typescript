import {
  Body,
  CacheInterceptor,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  Query,
  Req,
  UseFilters,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import JwtTwoFactorGuard from 'src/auth/guard/jwt-two-factor.guard';
import { JwtGuard } from 'src/auth/guard/jwt.guard';
import { RequestUser } from 'src/auth/interface/request-user.interface';
import { ExceptionLoggerFilter } from 'src/utils/exceptions-logger.filter';
import { FindOneParams } from 'src/utils/find-one.params';
import { PaginationParams } from 'src/utils/pagination.params';
import { CreatePostDto, UpdatePostDto } from './dto';
import { PostsService } from './posts.service';

@Controller('posts')
@UseFilters(ExceptionLoggerFilter)
@UseGuards(JwtGuard)
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  @HttpCode(200)
  @UseInterceptors(CacheInterceptor)
  getAllPosts(
    @Query('paragraph') paragraph: string,
    @Query() { offset, limit }: PaginationParams,
  ) {
    if (paragraph) {
      return this.postsService.getPostsWithParagraph(paragraph, offset, limit);
    }
    return this.postsService.getAllPosts(offset, limit);
  }

  // @Get('search')
  // async getPosts(@Query('q') search: string) {
  //   if (search) {
  //     return this.postsService.searchForPosts(search);
  //   }
  //   return this.postsService.getAllPosts();
  // }

  @Get(':id')
  @HttpCode(200)
  getPostById(@Param() { id }: FindOneParams) {
    return this.postsService.getPostById(Number(id));
  }

  @Post()
  @HttpCode(201)
  @UseGuards(JwtTwoFactorGuard)
  async createPost(@Body() post: CreatePostDto, @Req() req: RequestUser) {
    return this.postsService.createPost(post, req.user);
  }

  @Put(':id')
  @HttpCode(200)
  async updatePost(@Param('id') id: string, @Body() post: UpdatePostDto) {
    return this.postsService.updatePost(Number(id), post);
  }

  @Delete(':id')
  @HttpCode(204)
  async deletePost(@Param('id') id: string) {
    return this.postsService.deletePost(Number(id));
  }
}
