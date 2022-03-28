import { Injectable, NotFoundException } from '@nestjs/common';
import { Report } from './entities/reports.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateReportDTO } from './dtos/create-report.dto';
import { User } from 'src/users/entities/users.entities';
import { GetEstimateDTO } from './dtos/get-estimate.dto';

@Injectable()
export class ReportsService {
  constructor(@InjectRepository(Report) private repo: Repository<Report>) {}

  async create(reportDTO: CreateReportDTO, user: User) {
    const report = await this.repo.create(reportDTO);
    report.user = user;
    return this.repo.save(report);
  }

  async changeApproval(id: number, approved: boolean) {
    const report = await this.repo.findOne({ where: { id: id } });
    if (!id) {
      throw new NotFoundException('Report not found');
    }

    report.approved = approved;
    return this.repo.save(report);
  }

  async createEstimate({
    make,
    model,
    lng,
    lat,
    year,
    mileage,
  }: GetEstimateDTO) {
    return this.repo
      .createQueryBuilder()
      .select('AVG(price)', 'price')
      .where('make = :make', { make }) // Filtering from QueryBuilder
      .andWhere('model = :model', { model })
      .andWhere('lng - :lng BETWEEN -5 AND 5', { lng })
      .andWhere('lat - :lat BETWEEN -5 AND 5', { lat })
      .andWhere('year - :year BETWEEN -3 AND 3', { year })
      .andWhere('approved IS TRUE')
      .orderBy('ABS(mileage - :mileage)', 'DESC') // Sorting
      .setParameters({ mileage })
      .limit(3)
      .getRawOne();
  }
}
