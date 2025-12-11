import { ApiProperty } from '@nestjs/swagger';

export class BillingSummaryResponseDto {
  @ApiProperty({ description: 'Total usage in current month' })
  totalUsage: number;

  @ApiProperty({ description: 'Plan quota' })
  planQuota: number;

  @ApiProperty({ description: 'Extra units beyond quota', required: false })
  extraUnits?: number;

  @ApiProperty({ description: 'Extra charges for extra units', required: false })
  extraCharges?: number;

  @ApiProperty({ description: 'Active plan information' })
  activePlan: {
    id: number;
    name: string;
    monthlyQuota: number;
    extraChargePerUnit: number;
  };

  @ApiProperty({ description: 'Current month' })
  currentMonth: string;

  @ApiProperty({ description: 'Total amount due (0 if no extra charges)' })
  totalAmountDue: number;
}