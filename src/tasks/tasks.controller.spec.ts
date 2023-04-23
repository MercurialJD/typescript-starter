import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { TasksController, convertIdToInt } from './tasks.controller';
import { TasksService } from './tasks.service';
import { Task, TaskStatus } from './tasks.entity';

// Mock implementation of the TasksService
const mockTasksService = {
  createTask: jest.fn(),
  getTaskById: jest.fn(),
  deleteTaskById: jest.fn(),
};

describe('TasksController', () => {

  let tasksController: TasksController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TasksController],
      providers: [{ provide: TasksService, useValue: mockTasksService }],
    }).compile();

    tasksController = module.get<TasksController>(TasksController);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should be defined', () => {
    expect(tasksController).toBeDefined();
  });

  // Unit tests for controller createTask
  describe('createTask', () => {
    it('should call the createTask method on the service and return the result (without description)', async () => {
      const mockTask: Partial<Task> = {
        title: 'Test task 1 (without description)',
        status: TaskStatus.TODO,
      };
      const expectedResult: Task = {
        ...mockTask,
        id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      } as Task;

      mockTasksService.createTask.mockResolvedValue(expectedResult);
      const result = await tasksController.createTask(mockTask);

      expect(mockTasksService.createTask).toHaveBeenCalledWith(mockTask);
      expect(result).toEqual(expectedResult);
    });

    it('should call the createTask method on the service and return the result (with description)', async () => {
      const mockTask: Partial<Task> = {
        title: 'Test task 2 (with description)',
        description: 'This is the description for test task 2',
        status: TaskStatus.TODO,
      };
      const expectedResult: Task = {
        ...mockTask,
        id: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      } as Task;

      mockTasksService.createTask.mockResolvedValue(expectedResult);
      const result = await tasksController.createTask(mockTask);

      expect(mockTasksService.createTask).toHaveBeenCalledWith(mockTask);
      expect(result).toEqual(expectedResult);
    });

    it('should throw BadRequestException if title is empty', async () => {
      const invalidTask: Partial<Task> = {
        title: '',
        description: 'Description for an invalid task with empty title',
        status: TaskStatus.TODO,
      };

      await expect(tasksController.createTask(invalidTask)).rejects.toThrow(BadRequestException);
    });

    it('should throw BadRequestException if title is missing', async () => {
      const invalidTask: Partial<Task> = {
        description: 'Description for an invalid task without title',
        status: TaskStatus.TODO,
      };

      await expect(tasksController.createTask(invalidTask)).rejects.toThrow(BadRequestException);
    });

    it('should throw BadRequestException if status is missing', async () => {
      const invalidTask: Partial<Task> = {
        title: 'Title for an invalid task without status'
      };

      await expect(tasksController.createTask(invalidTask)).rejects.toThrow(BadRequestException);
    });
  });

  // Unit tests for controller getTaskById
  describe('getTaskById', () => {
    it('should call the getTaskById method on the service and return the result', async () => {
      const taskId = '1';
      const expectedResult: Task = {
        id: 1,
        title: 'Test task 1',
        description: null,
        status: TaskStatus.TODO,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockTasksService.getTaskById.mockResolvedValue(expectedResult);
      const result = await tasksController.getTaskById(taskId);

      expect(mockTasksService.getTaskById).toHaveBeenCalledWith(convertIdToInt(taskId));
      expect(result).toEqual(expectedResult);
    });

    it('should throw an error when id is not a number', async () => {
      const invalidId = 'not-a-number';

      await expect(tasksController.getTaskById(invalidId)).rejects.toThrow(BadRequestException);
    });
  });

  // Unit tests for controller deleteTaskById
  describe('deleteTaskById', () => {
    it('should call the deleteTaskById method on the service and return the result', async () => {
      const taskId = '1';
      const expectedResult = { message: `Task with ID ${taskId} has been deleted.` };

      mockTasksService.deleteTaskById.mockResolvedValue(expectedResult);
      const result = await tasksController.deleteTaskById(taskId);

      expect(mockTasksService.deleteTaskById).toHaveBeenCalledWith(convertIdToInt(taskId));
      expect(result).toEqual(expectedResult);
    });

    it('should throw an error when id is not a number', async () => {
      const invalidId = 'not-a-number';

      await expect(tasksController.deleteTaskById(invalidId)).rejects.toThrowError();
    });
  });
});
