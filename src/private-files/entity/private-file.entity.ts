import User from 'src/users/entity/user.entity';
import { Column, PrimaryGeneratedColumn, Entity, ManyToOne } from 'typeorm';

@Entity()
class PrivateFile {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public key: string;

  @ManyToOne(() => User, (owner: User) => owner.files)
  public owner: User;
}

export default PrivateFile;
