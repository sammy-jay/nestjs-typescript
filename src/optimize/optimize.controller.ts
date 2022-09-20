import { InjectQueue } from '@nestjs/bull';
import {
  Controller,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { Queue } from 'bull';

@Controller('optimize')
export class OptimizeController {
  constructor(@InjectQueue('image') private readonly imageQueue: Queue) {}

  @Post('image')
  @UseInterceptors(AnyFilesInterceptor())
  async processImage(@UploadedFiles() files: Express.Multer.File[]) {
    const job = await this.imageQueue.add('optimize', {
      files,
    });

    return {
      jobId: job.id,
    };
  }
}
