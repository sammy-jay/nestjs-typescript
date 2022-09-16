import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { JwtGuard } from 'src/auth/guard/jwt.guard';
import { ExceptionLoggerFilter } from 'src/utils/exceptions-logger.filter';
import { FindOneParams } from 'src/utils/find-one.params';
import { CreatePostDto, UpdatePostDto } from './dto';
import { PostsService } from './posts.service';

@Controller('posts')
@UseFilters(ExceptionLoggerFilter)
@UseGuards(JwtGuard)
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  @HttpCode(200)
  getAllPosts() {
    return this.postsService.getAllPosts();
  }

  @Get(':id')
  @HttpCode(200)
  getPostById(@Param() { id }: FindOneParams) {
    console.log(typeof id);
    return this.postsService.getPostById(Number(id));
  }

  @Post()
  @HttpCode(201)
  async createPost(@Body() post: CreatePostDto) {
    return this.postsService.createPost(post);
  }

  @Put(':id')
  @HttpCode(200)
  async replacePost(@Param('id') id: string, @Body() post: UpdatePostDto) {
    return this.postsService.replacePost(Number(id), post);
  }

  @Delete(':id')
  @HttpCode(204)
  async deletePost(@Param('id') id: string) {
    return this.postsService.deletePost(Number(id));
  }
}
