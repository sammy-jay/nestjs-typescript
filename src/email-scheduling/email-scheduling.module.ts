import { Module } from '@nestjs/common';
import { EmailModule } from 'src/email/email.module';
import { EmailSchedulingController } from './email-scheduling.controller';
import { EmailSchedulingService } from './email-scheduling.service';

@Module({
  imports: [EmailModule],
  controllers: [EmailSchedulingController],
  providers: [EmailSchedulingService],
})
export class EmailSchedulingModule {}
