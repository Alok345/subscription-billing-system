import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UsageRecordsService } from './usage-records.service';
import { CreateUsageRecordDto } from './dto/create-usage-record.dto';
import { UsageRecord } from './entities/usage-record.entity';

@ApiTags('Usage Records')
@Controller('usage')
export class UsageRecordsController {
  constructor(private readonly usageRecordsService: UsageRecordsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Record a usage entry for a user' })
  @ApiResponse({ status: 201, description: 'Usage record created successfully', type: UsageRecord })
  @ApiResponse({ status: 404, description: 'User not found' })
  async create(@Body() createUsageRecordDto: CreateUsageRecordDto): Promise<UsageRecord> {
    return await this.usageRecordsService.create(createUsageRecordDto);
  }
}