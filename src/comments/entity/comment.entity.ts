import { Exclude } from 'class-transformer';
import Post from 'src/posts/entity/post.entity';
import User from 'src/users/entity/user.entity';
import { Column, PrimaryGeneratedColumn, Entity, ManyToOne } from 'typeorm';

@Entity()
class Comment {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public content: string;

  @ManyToOne(() => Post, (post: Post) => post.comments)
  public post: Post;

  @Exclude()
  @ManyToOne(() => User, (author: User) => author.posts)
  public author: User;
}

export default Comment;
