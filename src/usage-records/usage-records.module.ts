import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsageRecordsService } from './usage-records.service';
import { UsageRecordsController } from './usage-records.controller';
import { UsageRecord } from './entities/usage-record.entity';
import { User } from '../users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UsageRecord, User])],
  controllers: [UsageRecordsController],
  providers: [UsageRecordsService],
  exports: [UsageRecordsService, TypeOrmModule],
})
export class UsageRecordsModule {}

