import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import Post from './entity/post.entity';
import { CreatePostDto, UpdatePostDto } from './dto';
import { PostNotFoundException } from './exception/post-not-found.exception';
import User from 'src/users/entity/user.entity';
import PostsSearchService from './post-search.service';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post) private readonly postsRepository: Repository<Post>,
    private readonly postsSearchService: PostsSearchService,
  ) {}

  async getAllPosts() {
    return await this.postsRepository.find({
      relations: ['categories', 'author'],
      cache: true,
    });
  }

  async getPostById(id: number) {
    const post = await this.postsRepository.findOne({
      where: { id },
      relations: ['categories', 'author'],
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
    console.log(newPost);
    delete newPost.author;
    return newPost;
  }

  async updatePost(id: number, post: UpdatePostDto) {
    await this.postsRepository.update(id, post);
    const updatedPost = await this.postsRepository.findOne({
      where: { id },
      relations: ['categories', 'author'],
      cache: true,
    });
    if (updatedPost) {
      await this.postsSearchService.update(updatedPost);
      return updatedPost;
    }
    throw new PostNotFoundException(id);
  }

  async deletePost(id: number) {
    const deleteResponse = await this.postsRepository.delete(id);
    if (!deleteResponse.affected) throw new PostNotFoundException(id);
    await this.postsSearchService.remove(id);
    return;
  }

  async searchForPosts(text: string) {
    const results = await this.postsSearchService.search(text);
    const ids = results.map((result) => result.id);
    if (!ids.length) {
      return [];
    }
    return this.postsRepository.find({
      where: { id: In(ids) },
    });
  }

  async getPostsWithParagraph(paragraph: string) {
    return await this.postsRepository.query(
      'SELECT * FROM post WHERE $1 = ANY(paragraphs)',
      [paragraph],
    );
  }
}
