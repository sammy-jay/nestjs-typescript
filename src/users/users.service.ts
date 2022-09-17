import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FilesService } from 'src/files/files.service';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto';
import Address from './entity/address.entity';
import User from './entity/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
    @InjectRepository(Address)
    private readonly addressRepository: Repository<Address>,
    private readonly filesService: FilesService,
  ) {}

  async getByEmail(email: string) {
    const user = await this.usersRepository.findOneBy({
      email,
    });
    if (user) {
      return user;
    }
    throw new HttpException(
      'User with this email address not found.',
      HttpStatus.NOT_FOUND,
    );
  }

  async getById(id: number) {
    const user = await this.usersRepository.findOneBy({
      id,
    });
    if (user) {
      return user;
    }
    throw new HttpException(
      'User with this credentials not found.',
      HttpStatus.NOT_FOUND,
    );
  }

  async create(userData: CreateUserDto) {
    const newUser = await this.usersRepository.create({
      ...userData,
    });
    await this.usersRepository.save(newUser);
    return newUser;
  }

  async addAvatar(userId: number, imageBuffer: Buffer, filename: string) {
    const user = await this.getById(userId);
    if (user.avatar) {
      await this.deleteAvatar(userId);
    }
    const avatar = await this.filesService.uploadPublicFile(
      imageBuffer,
      filename,
    );
    await this.usersRepository.update(userId, {
      ...user,
      avatar,
    });
    return avatar;
  }

  async deleteAvatar(userId: number) {
    const user = await this.getById(userId);
    await this.deleteUserAvatar(user);
  }

  async deleteUserAvatar(user: User) {
    const fileId = user.avatar?.id;
    if (fileId) {
      await this.usersRepository.update(user.id, {
        ...user,
        avatar: null,
      });
      await this.filesService.deletePublicFile(fileId);
    }
  }
}
