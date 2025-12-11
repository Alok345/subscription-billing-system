import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { Subscription } from '../../subscriptions/entities/subscription.entity';

@Entity('plans')
export class Plan {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ name: 'monthly_quota' })
  monthlyQuota: number;

  @Column({ name: 'extra_charge_per_unit', type: 'decimal', precision: 10, scale: 2 })
  extraChargePerUnit: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @OneToMany(() => Subscription, subscription => subscription.plan)
  subscriptions: Subscription[];
}