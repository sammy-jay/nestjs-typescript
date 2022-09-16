import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
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
  async createPost(@Body() post: CreatePostDto, @Req() req: RequestUser) {
    return this.postsService.createPost(post, req.user);
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
