import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PrivateFilesService } from 'src/private-files/private-files.service';
import { PublicFilesService } from 'src/public-files/public-files.service';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto';
import * as bcrypt from 'bcrypt';
import Address from './entity/address.entity';
import User from './entity/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
    @InjectRepository(Address)
    private readonly addressRepository: Repository<Address>,
    private readonly publicFilesService: PublicFilesService,
    private readonly privateFilesService: PrivateFilesService,
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
    const avatar = await this.publicFilesService.uploadPublicFile(
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
      await this.publicFilesService.deletePublicFile(fileId);
    }
  }

  async addPrivateFile(userId: number, imageBuffer: Buffer, filename: string) {
    return this.privateFilesService.uploadPrivateFile(
      userId,
      imageBuffer,
      filename,
    );
  }

  async getPrivateFile(userId: number, fileId: number) {
    const fileInfo = await this.privateFilesService.getFileInfo(fileId);
    if (fileInfo.owner.id === userId) {
      return await this.privateFilesService.downloadPrivateFile(fileId);
    }
    throw new UnauthorizedException('You do not have access to this file.');
  }

  async getAllPrivateFiles(userId: number) {
    const userWithFiles = await this.usersRepository.findOne({
      where: { id: userId },
      relations: ['files'],
    });
    if (userWithFiles) {
      return Promise.all(
        userWithFiles.files.map(async (file) => {
          const url = await this.privateFilesService.generatePresignedUrl(
            file.key,
          );
          return {
            ...file,
            url,
          };
        }),
      );
    }
    throw new NotFoundException('User with id ' + userId + ' not found.');
  }

  async setCurrentRefreshToken(refreshToken: string, userId: number) {
    const currentHashedRefreshToken = await bcrypt.hash(refreshToken, 10);
    await this.usersRepository.update(userId, {
      currentHashedRefreshToken,
    });
  }

  async getUserIfRefreshTokenMatches(refreshToken: string, userId: number) {
    const user = await this.getById(userId);

    const isRefreshTokenMatching = await bcrypt.compare(
      refreshToken,
      user.currentHashedRefreshToken,
    );

    if (isRefreshTokenMatching) {
      return user;
    }
  }

  async removeRefreshToken(userId: number) {
    return this.usersRepository.update(userId, {
      currentHashedRefreshToken: null,
    });
  }
}
