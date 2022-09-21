import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { OptimizeController } from './optimize.controller';
import { ImageProcessor } from './optimize.processor';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'image',
    }),
  ],
  controllers: [OptimizeController],
  providers: [ImageProcessor],
})
export class OptimizeModule {}
