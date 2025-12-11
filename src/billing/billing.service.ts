import { Injectable } from '@nestjs/common';
import { SubscriptionsService } from '../subscriptions/subscriptions.service';
import { UsageRecordsService } from '../usage-records/usage-records.service';
import { CurrentUsageResponseDto } from './dto/current-usage.dto';
import { BillingSummaryResponseDto } from './dto/billing-summary.dto';
import * as dayjs from 'dayjs';

@Injectable()
export class BillingService {
  constructor(
    private subscriptionsService: SubscriptionsService,
    private usageRecordsService: UsageRecordsService,
  ) {}

  async getCurrentUsage(userId: number): Promise<CurrentUsageResponseDto> {
    const activeSubscription = await this.subscriptionsService.getActiveSubscription(userId);
    const totalUnitsUsed = await this.usageRecordsService.getCurrentMonthUsage(userId);
    
    const remainingUnits = Math.max(0, activeSubscription.plan.monthlyQuota - totalUnitsUsed);
    
    return {
      totalUnitsUsed,
      remainingUnits,
      activePlan: {
        id: activeSubscription.plan.id,
        name: activeSubscription.plan.name,
        monthlyQuota: activeSubscription.plan.monthlyQuota,
        extraChargePerUnit: parseFloat(activeSubscription.plan.extraChargePerUnit.toString()),
      },
      currentMonth: dayjs().format('YYYY-MM'),
    };
  }

  async getBillingSummary(userId: number): Promise<BillingSummaryResponseDto> {
    const activeSubscription = await this.subscriptionsService.getActiveSubscription(userId);
    const totalUsage = await this.usageRecordsService.getCurrentMonthUsage(userId);
    const planQuota = activeSubscription.plan.monthlyQuota;
    
    const response: BillingSummaryResponseDto = {
      totalUsage,
      planQuota,
      activePlan: {
        id: activeSubscription.plan.id,
        name: activeSubscription.plan.name,
        monthlyQuota: activeSubscription.plan.monthlyQuota,
        extraChargePerUnit: parseFloat(activeSubscription.plan.extraChargePerUnit.toString()),
      },
      currentMonth: dayjs().format('YYYY-MM'),
      totalAmountDue: 0,
    };

    if (totalUsage > planQuota) {
      const extraUnits = totalUsage - planQuota;
      const extraCharges = extraUnits * parseFloat(activeSubscription.plan.extraChargePerUnit.toString());
      
      response.extraUnits = extraUnits;
      response.extraCharges = parseFloat(extraCharges.toFixed(2));
      response.totalAmountDue = response.extraCharges;
    }

    return response;
  }
}