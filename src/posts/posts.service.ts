import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Post from './entity/post.entity';
import { CreatePostDto, UpdatePostDto } from './dto';
import { PostNotFoundException } from './exception/post-not-found.exception';
import User from 'src/users/entity/user.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post) private readonly postsRepository: Repository<Post>,
  ) {}

  async getAllPosts() {
    return await this.postsRepository.find({
      select: {
        id: true,
        title: true,
        content: true,
      },
      cache: true,
    });
  }

  async getPostById(id: number) {
    const post = await this.postsRepository.findOne({
      where: { id },
      select: {
        id: true,
        title: true,
        author: { email: true },
        categories: { id: true },
      },
      cache: true,
    });
    if (post) {
      return post;
    }
    throw new PostNotFoundException(id);
  }

  async createPost(post: CreatePostDto, user: User) {
    const newPost = await this.postsRepository.create({
      ...post,
      author: user,
      categories: [{ ...post.categories }],
    });
    await this.postsRepository.save(newPost);
    delete newPost.author;
    return newPost;
  }

  async updatePost(id: number, post: UpdatePostDto) {
    await this.postsRepository.update(id, post);
    const updatedPost = await this.postsRepository.findOne({
      where: { id },
      select: {
        id: true,
        title: true,
        author: { email: true },
        categories: { id: true },
      },
      cache: true,
    });
    if (updatedPost) {
      return updatedPost;
    }
    throw new PostNotFoundException(id);
  }

  async deletePost(id: number) {
    const deleteResponse = await this.postsRepository.delete(id);
    if (deleteResponse.affected) return;
    throw new PostNotFoundException(id);
  }
}
