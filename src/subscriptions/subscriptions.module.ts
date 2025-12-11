import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Subscription } from './entities/subscription.entity';
import { SubscriptionsService } from './subscriptions.service';
import { User } from '../users/entities/user.entity';
import { Plan } from '../plans/entities/plan.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Subscription, User, Plan])],
  providers: [SubscriptionsService],
  exports: [SubscriptionsService, TypeOrmModule],
})
export class SubscriptionsModule {}

