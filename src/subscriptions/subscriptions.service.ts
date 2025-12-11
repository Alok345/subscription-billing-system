import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Subscription } from './entities/subscription.entity';
import { User } from '../users/entities/user.entity';
import { Plan } from '../plans/entities/plan.entity';

@Injectable()
export class SubscriptionsService {
  constructor(
    @InjectRepository(Subscription)
    private subscriptionRepository: Repository<Subscription>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Plan)
    private planRepository: Repository<Plan>,
  ) {}

  async createSubscription(userId: number, planId: number): Promise<Subscription> {
    // Check if user exists
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    // Check if plan exists
    const plan = await this.planRepository.findOne({ where: { id: planId } });
    if (!plan) {
      throw new NotFoundException(`Plan with ID ${planId} not found`);
    }

    // Check if user already has an active subscription
    const existingActiveSubscription = await this.subscriptionRepository.findOne({
      where: { userId, isActive: true },
    });

    if (existingActiveSubscription) {
      throw new ConflictException('User already has an active subscription');
    }

    // Create new subscription
    const subscription = this.subscriptionRepository.create({
      userId,
      planId,
      startDate: new Date(),
      isActive: true,
    });

    return await this.subscriptionRepository.save(subscription);
  }

  async updateSubscriptionStatus(userId: number, subscriptionId: number, isActive: boolean): Promise<Subscription> {
    const subscription = await this.subscriptionRepository.findOne({
      where: { id: subscriptionId, userId },
    });

    if (!subscription) {
      throw new NotFoundException(`Subscription with ID ${subscriptionId} not found for user ${userId}`);
    }

    // If activating, check if another active subscription exists
    if (isActive && !subscription.isActive) {
      const existingActive = await this.subscriptionRepository.findOne({
        where: { userId, isActive: true },
      });

      if (existingActive) {
        throw new ConflictException('User already has an active subscription');
      }
    }

    subscription.isActive = isActive;
    return await this.subscriptionRepository.save(subscription);
  }

  async getActiveSubscription(userId: number): Promise<Subscription> {
    const subscription = await this.subscriptionRepository.findOne({
      where: { userId, isActive: true },
      relations: ['plan'],
    });

    if (!subscription) {
      throw new NotFoundException(`No active subscription found for user ${userId}`);
    }

    return subscription;
  }
}