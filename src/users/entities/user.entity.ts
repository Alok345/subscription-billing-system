import { 
  Entity, 
  PrimaryGeneratedColumn, 
  Column, 
  CreateDateColumn, 
  UpdateDateColumn, 
  OneToMany 
} from 'typeorm';
import { Subscription } from '../../subscriptions/entities/subscription.entity';
import { UsageRecord } from '../../usage-records/entities/usage-record.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @OneToMany(() => Subscription, subscription => subscription.user)
  subscriptions: Subscription[];

  @OneToMany(() => UsageRecord, usageRecord => usageRecord.user)
  usageRecords: UsageRecord[];
}