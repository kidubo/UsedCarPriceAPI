import { Injectable } from '@nestjs/common';
import { Report } from './entities/reports.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateReportDTO } from './dtos/create-report.dto';
import { User } from 'src/users/entities/users.entities';

@Injectable()
export class ReportsService {
  constructor(@InjectRepository(Report) private repo: Repository<Report>) {}

  async create(reportDTO: CreateReportDTO, user: User) {
    const report = await this.repo.create(reportDTO);
    report.user = user;
    return this.repo.save(report);
  }
}
