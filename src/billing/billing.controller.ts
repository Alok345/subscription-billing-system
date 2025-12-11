import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { BillingService } from './billing.service';
import { CurrentUsageResponseDto } from './dto/current-usage.dto';
import { BillingSummaryResponseDto } from './dto/billing-summary.dto';

@ApiTags('Billing')
@Controller('users')
export class BillingController {
  constructor(private readonly billingService: BillingService) {}

  @Get(':id/current-usage')
  @ApiOperation({ summary: 'Get user current usage for the month' })
  @ApiParam({ name: 'id', description: 'User ID' })
  @ApiResponse({ status: 200, description: 'Current usage retrieved', type: CurrentUsageResponseDto })
  @ApiResponse({ status: 404, description: 'User or active subscription not found' })
  async getCurrentUsage(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<CurrentUsageResponseDto> {
    return await this.billingService.getCurrentUsage(id);
  }

  @Get(':id/billing-summary')
  @ApiOperation({ summary: 'Get user billing summary for the month' })
  @ApiParam({ name: 'id', description: 'User ID' })
  @ApiResponse({ status: 200, description: 'Billing summary retrieved', type: BillingSummaryResponseDto })
  @ApiResponse({ status: 404, description: 'User or active subscription not found' })
  async getBillingSummary(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<BillingSummaryResponseDto> {
    return await this.billingService.getBillingSummary(id);
  }
}