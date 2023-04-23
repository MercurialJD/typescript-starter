import { Test, TestingModule } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Task, TaskStatus } from './tasks.entity';

// Mock implementation of the Task repository
const mockTasksRepository = {
  create: jest.fn(),
  save: jest.fn(),
  findOneBy: jest.fn(),
  delete: jest.fn(),
};

describe('TasksService', () => {
  let tasksService: TasksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TasksService,
        { provide: getRepositoryToken(Task), useValue: mockTasksRepository },
      ],
    }).compile();

    tasksService = module.get<TasksService>(TasksService);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should be defined', () => {
    expect(tasksService).toBeDefined();
  });

  // Unit tests for service createTask
  describe('createTask', () => {
    it('should create a task without description and return it', async () => {
      const mockTask: Partial<Task> = {
        title: 'Test task 1 (without description)',
        description: null,
        status: TaskStatus.TODO,
      };
      const expectedResult: Task = {
        ...mockTask,
        id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      } as Task;

      mockTasksRepository.create.mockReturnValue(expectedResult);
      mockTasksRepository.save.mockResolvedValue(expectedResult);

      const result = await tasksService.createTask(mockTask);

      expect(mockTasksRepository.create).toHaveBeenCalledWith(mockTask);
      expect(mockTasksRepository.save).toHaveBeenCalledWith(expectedResult);
      expect(result).toEqual(expectedResult);
    });

    it('should create a task with description and return it', async () => {
      const mockTask: Partial<Task> = {
        title: 'Test task 2 (with description)',
        description: 'This is the description for test task 2',
        status: TaskStatus.IN_PROGRESS,
      };
      const expectedResult: Task = {
        ...mockTask,
        id: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      } as Task;

      mockTasksRepository.create.mockReturnValue(expectedResult);
      mockTasksRepository.save.mockResolvedValue(expectedResult);

      const result = await tasksService.createTask(mockTask);

      expect(mockTasksRepository.create).toHaveBeenCalledWith(mockTask);
      expect(mockTasksRepository.save).toHaveBeenCalledWith(expectedResult);
      expect(result).toEqual(expectedResult);
    });
  });

  // Unit tests for service getTaskById
  describe('getTaskById', () => {
    it('should call the repository findOnBy method and return the found task', async () => {
      const taskId = 3;
      const expectedResult: Task = {
        id: taskId,
        title: 'Test task 3',
        description: null,
        status: TaskStatus.TODO,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockTasksRepository.findOneBy.mockResolvedValue(expectedResult);
      const result = await tasksService.getTaskById(taskId);

      expect(mockTasksRepository.findOneBy).toHaveBeenCalledWith({ id: taskId });
      expect(result).toEqual(expectedResult);
    });

    it('should throw an error when the lookup id doesn\'t exist', async () => {
      const nonExistId = 100;

      await expect(tasksService.getTaskById(nonExistId)).rejects.toThrowError();
    });
  });

  // Unit tests for service deleteTaskById
  describe('deleteTaskById', () => {
    it('should call the repository delete method and return the success message', async () => {
      const taskId = 1;
      const expectedResult = { message: `Task with ID ${taskId} has been deleted.` };

      mockTasksRepository.delete.mockResolvedValue({ affected: 1 });
      const result = await tasksService.deleteTaskById(taskId);

      expect(mockTasksRepository.delete).toHaveBeenCalledWith(taskId);
      expect(result).toEqual(expectedResult);
    });

    it('should throw an error when the delete id doesn\'t exist', async () => {
      const nonExistId = 100;

      await expect(tasksService.deleteTaskById(nonExistId)).rejects.toThrowError();
    });
  });

});

