import { Controller, Post, Body, Get, Param, Delete } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './tasks.entity';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  /**
   * Create a new task with the given title and status.
   *
   * @param task - An object containing the title, description (optional), and status of the new task.
   * @returns - The created task.
   */
  @Post()
  async createTask(@Body() task: Partial<Task>): Promise<Task> {
    return await this.tasksService.createTask(task);
  }

  /**
   * Retrieve a task by its ID.
   *
   * @param id - The ID of the task to retrieve.
   * @returns - The requested task.
   */
  @Get(':id')
  async getTaskById(@Param('id') id: string): Promise<Task> {
    return await this.tasksService.getTaskById(id);
  }

  /**
   * Delete a task by its ID.
   *
   * @param id - The ID of the task to delete.
   * @returns - An object containing a success message.
   */
  @Delete(':id')
  async deleteTaskById(@Param('id') id: string): Promise<{ message: string }> {
    return await this.tasksService.deleteTaskById(id);
  }
}

