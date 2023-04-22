import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task, TaskStatus } from './tasks.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
  ) {}

  /**
   * Convert a given task ID from string to number.
   *
   * @param id - The task ID as a string.
   * @returns - The task ID as a number.
   * @throws - BadRequestException if the ID is not a valid integer.
   */
  convertIdToInt(id: string): number {
    const taskId = parseInt(id, 10);
    if (taskId.toString() !== id) {
      throw new BadRequestException('Invalid task ID.');
    }

    return taskId;
  }

  /**
   * Create a new task with the given information.
   *
   * @param task - An object containing the title, description (optional), and status of the new task.
   * @returns - The created task.
   * @throws - BadRequestException if the title or status is invalid.
   */
  async createTask(task: Partial<Task>): Promise<Task> {
    if (!task.title) {
      throw new BadRequestException('Title is required.');
    }

    if (!task.status || !Object.values(TaskStatus).includes(task.status)) {
      throw new BadRequestException('Invalid status.');
    }

    const newTask = this.tasksRepository.create(task);
    return await this.tasksRepository.save(newTask);
  }

  /**
   * Retrieve a task by its ID.
   *
   * @param id - The ID of the task to retrieve.
   * @returns - The requested task.
   * @throws - BadRequestException if the ID is invalid.
   *           NotFoundException if the task is not found.
   */
  async getTaskById(id: string): Promise<Task> {
    const taskId = this.convertIdToInt(id);
    const task = await this.tasksRepository.findOneBy({
        id: taskId
    });

    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found.`);
    }

    return task;
  }

  /**
   * Delete a task by its ID.
   *
   * @param id - The ID of the task to delete.
   * @returns - An object containing a success message.
   * @throws - BadRequestException if the ID is invalid.
   *           NotFoundException if the task is not found.
   */
  async deleteTaskById(id: string): Promise<{ message: string }> {
    const taskId = this.convertIdToInt(id);
    const result = await this.tasksRepository.delete(taskId);

    if (result.affected === 0) {
      throw new NotFoundException(`Task with ID ${id} not found.`);
    }

    return { message: `Task with ID ${id} has been deleted.` };
  }
}
