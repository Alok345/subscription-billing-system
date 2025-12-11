import { IsInt, IsString, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUsageRecordDto {
  @ApiProperty({ description: 'User ID', example: 1 })
  @IsInt()
  @Min(1)
  userId: number;

  @ApiProperty({ description: 'Action performed', example: 'api_call' })
  @IsString()
  action: string;

  @ApiProperty({ description: 'Units used', example: 5 })
  @IsInt()
  @Min(1)
  usedUnits: number;
}