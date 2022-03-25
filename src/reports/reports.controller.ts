import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/guards/auth.guard';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { CurrentUSer } from 'src/users/decorators/current-user.decorator';
import { User } from 'src/users/entities/users.entities';
import { CreateReportDTO } from './dtos/create-report.dto';
import { reportDto } from './dtos/report.dto';
import { ReportsService } from './reports.service';

@Controller('reports')
export class ReportsController {
  constructor(private reportsService: ReportsService) {}

  @Post()
  @UseGuards(AuthGuard)
  @Serialize(reportDto)
  createReport(@Body() body: CreateReportDTO, @CurrentUSer() user: User) {
    return this.reportsService.create(body, user);
  }
}
