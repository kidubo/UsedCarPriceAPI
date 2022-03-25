import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/guards/auth.guard';
import { CurrentUSer } from 'src/users/decorators/current-user.decorator';
import { User } from 'src/users/entities/users.entities';
import { CreateReportDTO } from './dtos/create-report.dto';
import { ReportsService } from './reports.service';

@Controller('reports')
export class ReportsController {
  constructor(private reportsService: ReportsService) {}

  @Post()
  @UseGuards(AuthGuard)
  createReport(@Body() body: CreateReportDTO, @CurrentUSer() user: User) {
    return this.reportsService.create(body, user);
  }
}
