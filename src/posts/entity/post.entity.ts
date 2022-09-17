import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  Index
} from 'typeorm';
import User from '../../users/entity/user.entity';
import Category from '../../categories/entity/category.entity';

@Entity()
class Post {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public title: string;

  @Column()
  public content: string;

  
  @ManyToOne(() => User, (author: User) => author.posts)
  public author: User;

  @ManyToMany(() => Category, (category: Category) => category.posts, {
    cascade: true,
  })
  @JoinTable()
  public categories: Category[];
}

export default Post;
