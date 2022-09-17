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
import Post from '../../posts/entity/post.entity';
import PublicFile from 'src/files/entity/public-file.entity';

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

  @JoinColumn()
  @OneToOne(() => Address, { eager: true, cascade: true })
  public address: Relation<Address>;

  @JoinColumn()
  @OneToOne(() => PublicFile, {
    eager: true,
    nullable: true,
  })
  public avatar?: Relation<PublicFile>;

  @OneToMany(() => Post, (post: Post) => post.author)
  public posts: Post[];
}

export default User;
