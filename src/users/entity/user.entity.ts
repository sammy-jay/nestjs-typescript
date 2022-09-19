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
import PublicFile from 'src/public-files/entity/public-file.entity';
import PrivateFile from 'src/private-files/entity/private-file.entity';
import Message from 'src/chat/entity/message.entity';

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

  @Column({ nullable: true })
  @Exclude()
  public currentHashedRefreshToken?: string;

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

  @OneToMany(() => PrivateFile, (privateFile: PrivateFile) => privateFile.owner)
  public files: PrivateFile[];

  @OneToMany(() => Message, (message: Message) => message.author)
  public messages: Message[];
}

export default User;
