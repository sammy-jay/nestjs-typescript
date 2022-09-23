import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/auth/guard/jwt.guard';
import { EmailScheduleDto } from './dto/email-schedule.dto';
import { EmailSchedulingService } from './email-scheduling.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('email-scheduling')
@ApiTags('email-scheduling')
@UseGuards(JwtGuard)
export class EmailSchedulingController {
  constructor(
    private readonly emailSchedulingService: EmailSchedulingService,
  ) {}

  @Post('schedule')
  async scheduleEmail(@Body() emailSchedule: EmailScheduleDto) {
    this.emailSchedulingService.scheduleEmail(emailSchedule);
  }
}
