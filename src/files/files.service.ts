import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import PublicFile from './entity/public-file.entity';
import { v4 as uuid } from 'uuid';
import { S3 } from 'aws-sdk';
import User from 'src/users/entity/user.entity';

@Injectable()
export class FilesService {
  constructor(
    @InjectRepository(PublicFile)
    private readonly publicFilesRepository: Repository<PublicFile>,
    private readonly configService: ConfigService,
  ) {}

  async uploadPublicFile(dataBuffer: Buffer, filename: string) {
    const id = uuid();
    const s3 = new S3();
    const uploadResult = await s3
      .upload({
        ACL: 'public-read',
        Bucket: this.configService.get('AWS_PUBLIC_BUCKET_NAME'),
        Body: dataBuffer,
        Key: `${id}-${filename}`,
      })
      .promise();

    const newFile = await this.publicFilesRepository.create({
      key: uploadResult.Key,
      url: uploadResult.Location,
    });
    await this.publicFilesRepository.save(newFile);
    return newFile;
  }

  async deletePublicFile(fileId: number) {
    const file = await this.publicFilesRepository.findOne({
      where: { id: fileId },
    });
    const s3 = new S3();
    await s3
      .deleteObject({
        Bucket: this.configService.get('AWS_PUBLIC_BUCKET_NAME'),
        Key: file.key,
      })
      .promise();
    await this.publicFilesRepository.delete(fileId);
  }
}
