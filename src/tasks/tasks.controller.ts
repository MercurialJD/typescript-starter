import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  ValidationPipe,
  UsePipes,
  BadRequestException
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { TasksService } from './tasks.service';
import { Task, TaskStatus } from './tasks.entity';


/**
 * Convert a given task ID from string to number.
 *
 * @param id - The task ID as a string.
 * @returns - The task ID as a number.
 * @throws - BadRequestException if the ID is not a valid integer.
 */
export function convertIdToInt(id: string): number {
  const taskId = parseInt(id, 10);
  if (taskId.toString() !== id) {
    throw new BadRequestException('Invalid task ID.');
  }

  return taskId;
}

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  /**
   * Create a new task with the given information.
   *
   * @param task - An object containing the title, description (optional), and status of the new task.
   * @returns - The created task.
   * @throws - BadRequestException if the title or status is invalid.
   */
  @Post()
  @ApiTags('tasks')
  @ApiOperation({ description: 'Create a new task with the given information.' })
  @UsePipes(ValidationPipe)
  @HttpCode(HttpStatus.CREATED)
  async createTask(@Body() task: Partial<Task>): Promise<Task> {
    if (!task.title) {
      throw new BadRequestException('Title is required.');
    }

    if (!task.status) {
      throw new BadRequestException('Status is required.');
    }

    if (!Object.values(TaskStatus).includes(task.status)) {
      throw new BadRequestException('Invalid status.');
    }

    return await this.tasksService.createTask(task);
  }

  /**
   * Retrieve a task by its ID.
   *
   * @param id - The ID of the task to retrieve.
   * @returns - The requested task.
   * @throws - BadRequestException if the ID is invalid.
   */
  @Get(':id')
  @ApiTags('tasks')
  @ApiOperation({ description: 'Retrieve a task by its ID.' })
  @UsePipes(ValidationPipe)
  @HttpCode(HttpStatus.OK)
  async getTaskById(@Param('id') id: string): Promise<Task> {
    const taskId = convertIdToInt(id);
    return await this.tasksService.getTaskById(taskId);
  }

  /**
   * Delete a task by its ID.
   *
   * @param id - The ID of the task to delete.
   * @returns - An object containing a success message.
   * @throws - BadRequestException if the ID is invalid.
   */
  @Delete(':id')
  @ApiTags('tasks')
  @ApiOperation({ description: 'Delete a task by its ID.' })
  @UsePipes(ValidationPipe)
  @HttpCode(HttpStatus.OK)
  async deleteTaskById(@Param('id') id: string): Promise<{ message: string }> {
    const taskId = convertIdToInt(id);
    return await this.tasksService.deleteTaskById(taskId);
  }
}

