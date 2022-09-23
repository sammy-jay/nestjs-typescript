import { InjectQueue } from '@nestjs/bull';
import {
  Controller,
  Get,
  Param,
  Post,
  Res,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { Express, Response } from 'express';
import { Queue } from 'bull';
import { ApiTags } from '@nestjs/swagger';

@Controller('optimize')
@ApiTags('optimize')
export class OptimizeController {
  constructor(@InjectQueue('image') private readonly imageQueue: Queue) {}

  @Post('image')
  @UseInterceptors(AnyFilesInterceptor())
  async processImage(@UploadedFiles() files: Express.Multer.File[]) {
    console.log('called');
    const job = await this.imageQueue.add('optimize', {
      msg: 'hello',
    });

    return {
      jobId: job.id,
    };
  }

  @Get('image/:id')
  async getJobResult(@Res() response: Response, @Param('id') id: string) {
    const job = await this.imageQueue.getJob(id);

    if (!job) {
      return response.sendStatus(404);
    }

    const isCompleted = await job.isCompleted();

    if (!isCompleted) {
      return response.sendStatus(202);
    }
  }
}
