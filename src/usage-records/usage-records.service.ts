import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsageRecord } from './entities/usage-record.entity';
import { User } from '../users/entities/user.entity';
import { CreateUsageRecordDto } from './dto/create-usage-record.dto';

@Injectable()
export class UsageRecordsService {
  constructor(
    @InjectRepository(UsageRecord)
    private usageRecordRepository: Repository<UsageRecord>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createUsageRecordDto: CreateUsageRecordDto): Promise<UsageRecord> {
    // Check if user exists
    const user = await this.userRepository.findOne({
      where: { id: createUsageRecordDto.userId },
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${createUsageRecordDto.userId} not found`);
    }

    const usageRecord = this.usageRecordRepository.create({
      ...createUsageRecordDto,
      createdAt: new Date(),
    });

    return await this.usageRecordRepository.save(usageRecord);
  }

  async getCurrentMonthUsage(userId: number): Promise<number> {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59);

    const result = await this.usageRecordRepository
      .createQueryBuilder('usage')
      .select('SUM(usage.used_units)', 'total')
      .where('usage.user_id = :userId', { userId })
      .andWhere('usage.created_at BETWEEN :start AND :end', {
        start: startOfMonth,
        end: endOfMonth,
      })
      .getRawOne();

    return parseFloat(result.total) || 0;
  }

  async getUserUsageRecords(userId: number): Promise<UsageRecord[]> {
    return await this.usageRecordRepository.find({
      where: { userId },
      order: { createdAt: 'DESC' },
    });
  }
}