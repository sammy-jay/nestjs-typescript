import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  Query,
  Req,
  SerializeOptions,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { JwtGuard } from 'src/auth/guard/jwt.guard';
import { RequestUser } from 'src/auth/interface/request-user.interface';
import { ExceptionLoggerFilter } from 'src/utils/exceptions-logger.filter';
import { FindOneParams } from 'src/utils/find-one.params';
import { CreatePostDto, UpdatePostDto } from './dto';
import { PostsService } from './posts.service';

@Controller('posts')
@UseFilters(ExceptionLoggerFilter)
@SerializeOptions({ strategy: 'excludeAll' })
@UseGuards(JwtGuard)
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  async getPosts(@Query('search') search: string) {
    if (search) {
      console.log('called');
      return this.postsService.searchForPosts(search);
    }
    return this.postsService.getAllPosts();
  }

  @Get()
  @HttpCode(200)
  getAllPosts() {
    return this.postsService.getAllPosts();
  }

  @Get(':id')
  @HttpCode(200)
  getPostById(@Param() { id }: FindOneParams) {
    return this.postsService.getPostById(Number(id));
  }

  @Post()
  @HttpCode(201)
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
