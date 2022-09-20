import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { OptimizeController } from './optimize.controller';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'image',
    }),
  ],
  controllers: [OptimizeController],
})
export class OptimizeModule {}
