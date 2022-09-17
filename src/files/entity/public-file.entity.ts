import User from 'src/users/entity/user.entity';
import {
  Column,
  PrimaryGeneratedColumn,
  Entity,
  OneToOne,
  Relation,
} from 'typeorm';

@Entity()
class PublicFile {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public url: string;

  @Column()
  public key: string;
}

export default PublicFile;
