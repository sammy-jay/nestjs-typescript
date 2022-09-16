import { Request } from 'express';
import User from 'src/users/entity/user.entity';

export interface RequestUser extends Request {
  user: User;
}
