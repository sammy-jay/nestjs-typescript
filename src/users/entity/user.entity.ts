import {
  Column,
  PrimaryGeneratedColumn,
  Entity,
  Relation,
  JoinColumn,
  OneToOne,
  OneToMany,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import Address from './address.entity';
import Post from 'src/posts/entity/post.entity';

@Entity()
class User {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ unique: true })
  public email: string;

  @Column()
  public name: string;

  @Column()
  @Exclude()
  public password: string;

  @OneToOne(() => Address, { eager: true, cascade: true })
  @JoinColumn()
  public address: Relation<Address>;

  @OneToMany(() => Post, (post: Post) => post.author)
  public posts: Post[];
}

export default User;
