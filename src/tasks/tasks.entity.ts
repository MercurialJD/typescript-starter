import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IsNotEmpty, IsInt, IsString, IsOptional, IsNotEmptyObject, IsIn } from "class-validator";

/**
 * The three task status as enum.
 */
export enum TaskStatus {
  TODO = 'TODO',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
}

/**
 * Task entity representing a single task with an auto-generated ID, title (required),
 * description (optional), status (required), and timestamps (auto-generated).
 */
@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  @IsInt()
  id: number;

  @Column()
  @IsNotEmpty()
  @IsNotEmptyObject()
  @IsString()
  title: string;

  @Column({ nullable: true })
  @IsOptional()
  description: string;

  @Column({ type: 'enum', enum: TaskStatus })
  @IsNotEmpty()
  @IsNotEmptyObject()
  @IsIn(Object.values(TaskStatus))
  status: TaskStatus;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
