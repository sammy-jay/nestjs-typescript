import { Processor, Process } from '@nestjs/bull';
import { Job } from 'bull';
import { Logger } from '@nestjs/common';

@Processor('image')
export class ImageProcessor {
  private readonly logger = new Logger(ImageProcessor.name);

  @Process('optimize')
  handleOptimize(job: Job) {
    console.log('Called...');
    for (let i = 0; i < 100000000; i += 0.5) {
      //
    }

    this.logger.debug(job.data.msg);
    this.logger.debug('Optimization completed');
    return job.finished();
  }
}
