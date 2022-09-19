import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  Index,
  OneToMany,
} from 'typeorm';
import User from '../../users/entity/user.entity';
import Comment from '../../comments/entity/comment.entity';
import Category from '../../categories/entity/category.entity';
import { Exclude } from 'class-transformer';

@Entity()
class Post {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public title: string;

  // @Column('simple-array')
  @Column('text', { array: true })
  public paragraphs: string[];

  @Exclude()
  @Index('post_authorId_index')
  @ManyToOne(() => User, (author: User) => author.posts)
  public author: User;

  @Exclude()
  @ManyToMany(() => Category, (category: Category) => category.posts, {})
  @JoinTable()
  public categories: Category[];

  @OneToMany(() => Comment, (comments: Comment) => comments.post)
  public comments: Comment[];
}

export default Post;
