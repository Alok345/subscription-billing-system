import { ApiProperty } from '@nestjs/swagger';

export class PlanInfoDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  monthlyQuota: number;

  @ApiProperty()
  extraChargePerUnit: number;
}

export class CurrentUsageResponseDto {
  @ApiProperty({ description: 'Total units used in current month' })
  totalUnitsUsed: number;

  @ApiProperty({ description: 'Remaining units in quota' })
  remainingUnits: number;

  @ApiProperty({ description: 'Active plan information' })
  activePlan: PlanInfoDto;

  @ApiProperty({ description: 'Current month' })
  currentMonth: string;
}