import { Module } from '@nestjs/common';
import { BillingController } from './billing.controller';
import { BillingService } from './billing.service';
import { SubscriptionsModule } from '../subscriptions/subscriptions.module';
import { UsageRecordsModule } from '../usage-records/usage-records.module';

@Module({
  imports: [SubscriptionsModule, UsageRecordsModule],
  controllers: [BillingController],
  providers: [BillingService],
})
export class BillingModule {}

