import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  OneToOne,
  Relation,
} from 'typeorm';
import User from './user.entity';

@Entity()
class Address {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public street: string;

  @Column()
  public city: string;

  @Column()
  public country: string;

  @OneToOne(() => User, (user: User) => user.address)
  public user: Relation<User>;
}
export default Address;
