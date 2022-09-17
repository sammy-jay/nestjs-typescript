import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import PublicFile from './entity/public-file.entity';
import { PublicFilesService } from './public-files.service';

@Module({
  imports: [TypeOrmModule.forFeature([PublicFile]), ConfigModule],
  providers: [PublicFilesService],
  exports: [PublicFilesService],
})
export class PublicFilesModule {}
