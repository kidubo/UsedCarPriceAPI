import { Injectable } from '@nestjs/common';
import { Report } from './entities/reports.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateReportDTO } from './dtos/create-report.dto';

@Injectable()
export class ReportsService {
  constructor(@InjectRepository(Report) private repo: Repository<Report>) {}

  async create(reportDTO: CreateReportDTO) {
    const report = await this.repo.create(reportDTO);
    return this.repo.save(report);
  }
}
