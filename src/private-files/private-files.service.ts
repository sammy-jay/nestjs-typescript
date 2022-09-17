import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { S3 } from 'aws-sdk';
import { Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';
import PrivateFile from './entity/private-file.entity';

@Injectable()
export class PrivateFilesService {
  constructor(
    @InjectRepository(PrivateFile)
    private readonly privateFilesRepository: Repository<PrivateFile>,
    private readonly configService: ConfigService,
  ) {}

  async uploadPrivateFile(
    ownerId: number,
    dataBuffer: Buffer,
    filename: string,
  ) {
    const id = uuid();
    const s3 = new S3();
    const uploadResult = await s3
      .upload({
        Bucket: this.configService.get('AWS_PRIVATE_BUCKET_NAME'),
        Body: dataBuffer,
        Key: `private/${id}-${filename}`,
      })
      .promise();

    const newFile = await this.privateFilesRepository.create({
      key: uploadResult.Key,
      owner: {
        id: ownerId,
      },
    });
    await this.privateFilesRepository.save(newFile);
    return newFile;
  }

  async downloadPrivateFile(fileId: number) {
    const s3 = new S3();
    const fileInfo = await this.getFileInfo(fileId);

    const stream = await s3
      .getObject({
        Bucket: this.configService.get('AWS_PRIVATE_BUCKET_NAME'),
        Key: fileInfo.key,
      })
      .createReadStream();
    return {
      stream,
      info: fileInfo,
    };
  }

  async getFileInfo(fileId: number) {
    const fileInfo = await this.privateFilesRepository.findOne({
      where: { id: fileId },
      relations: ['owner'],
    });
    if (fileInfo) {
      return fileInfo;
    }
    throw new NotFoundException('File with id ' + fileId + ' not found.');
  }

  async generatePresignedUrl(key: string) {
    const s3 = new S3();

    return s3.getSignedUrlPromise('getObject', {
      Bucket: this.configService.get('AWS_PRIVATE_BUCKET_NAME'),
      Key: key,
    });
  }
}
