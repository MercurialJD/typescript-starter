import { Injectable, NotFoundException } from '@nestjs/common';
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
   * Create a new task with the given information.
   *
   * @param task - An object containing the title, description (optional), and status of the new task.
   * @returns - The created task.
   */
  async createTask(task: Partial<Task>): Promise<Task> {
    const newTask = this.tasksRepository.create(task);
    return await this.tasksRepository.save(newTask);
  }

  /**
   * Retrieve a task by its ID.
   *
   * @param id - The ID of the task to retrieve.
   * @returns - The requested task.
   * @throws - NotFoundException if the task is not found.
   */
  async getTaskById(id: number): Promise<Task> {
    const task = await this.tasksRepository.findOneBy({
      id: id,
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
   * @throws - NotFoundException if the task is not found.
   */
  async deleteTaskById(id: number): Promise<{ message: string }> {
    const result = await this.tasksRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Task with ID ${id} not found.`);
    }

    return { message: `Task with ID ${id} has been deleted.` };
  }
}
