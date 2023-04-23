import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('Tasks E2E Test', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'postgres',
          host: 'localhost',
          port: 5432,
          username: 'postgres',
          // password: 'password',
          database: 'Tasks',
          entities: ['./**/*.entity{.ts,.js}'],
          synchronize: true,
        }),
        AppModule,
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  // E2E tests for POST
  describe('Create a task (POST)', () => {
    it('should create a task with valid info', () => {
      const task = {
        title: 'Test Task',
        description: 'This is a test task',
        status: 'TODO',
      };

      return request(app.getHttpServer())
        .post('/tasks')
        .send(task)
        .expect(201)
        .then(({ body }) => {
          expect(body.title).toEqual(task.title);
          expect(body.description).toEqual(task.description);
          expect(body.status).toEqual(task.status);
        });
    });

    it('should throw a 400 error when try to create a task without title', () => {
      const task = {
        description: 'This is a invalid test task with no title',
        status: 'TODO'
      };

      return request(app.getHttpServer())
        .post('/tasks')
        .send(task)
        .expect(400);
    });

    it('should throw a 400 error when try to create a task without status', () => {
      const task = {
        title: 'Invalid task with no status',
        description: 'This is a invalid test task with no status'
      };

      return request(app.getHttpServer())
        .post('/tasks')
        .send(task)
        .expect(400);
    });

    it('should throw a 400 error when try to create a task with invalid status', () => {
      const task = {
        title: 'Invalid task with no status',
        description: 'This is a invalid test task with no status',
        status: 'INVALID_STATUS'
      };

      return request(app.getHttpServer())
        .post('/tasks')
        .send(task)
        .expect(400);
    });
  });

  // E2E tests for GET
  describe('Get a task (GET)', () => {
    it('should get a task by its valid ID', async () => {
      const { body: createdTask } = await request(app.getHttpServer())
        .post('/tasks')
        .send({ title: 'Test Task', status: 'IN_PROGRESS' })
        .expect(201);

      return request(app.getHttpServer())
        .get(`/tasks/${createdTask.id}`)
        .expect(200)
        .then(({ body }) => {
          expect(body.id).toEqual(createdTask.id);
          expect(body.title).toEqual(createdTask.title);
          expect(body.status).toEqual(createdTask.status);
        });
    });

    it('should throw a 404 error for a non-exist ID', async () => {
      const { body: createdTask } = await request(app.getHttpServer())
        .post('/tasks')
        .send({ title: 'Test Task', status: 'TODO' })
        .expect(201);

      return request(app.getHttpServer())
        .get(`/tasks/${createdTask.id + 1000}`)
        .expect(404);
    });

    it('should throw a 400 error for an NaN ID', async () => {
      return request(app.getHttpServer())
        .get(`/tasks/not-a-number`)
        .expect(400);
    });
  });

  // E2E tests for DELETE
  describe('Delete a task (DELETE)', () => {
    it('should delete a task by its valid ID', async () => {
      const { body: createdTask } = await request(app.getHttpServer())
        .post('/tasks')
        .send({ title: 'Task to delete', status: 'COMPLETED' })
        .expect(201);

      await request(app.getHttpServer())
        .delete(`/tasks/${createdTask.id}`)
        .expect(200)
        .then(({ body }) => {
          expect(body.message).toEqual( `Task with ID ${createdTask.id} has been deleted.` );
        });

      return request(app.getHttpServer())
        .get(`/tasks/${createdTask.id}`)
        .expect(404);
    });

    it('should throw a 404 error for a non-exist ID', async () => {
      const { body: createdTask } = await request(app.getHttpServer())
        .post('/tasks')
        .send({ title: 'Test Task', status: 'TODO' })
        .expect(201);

      return request(app.getHttpServer())
        .get(`/tasks/${createdTask.id + 1000}`)
        .expect(404);
    });

    it('should throw a 400 error for an NaN ID', async () => {
      return request(app.getHttpServer())
        .get(`/tasks/not-a-number`)
        .expect(400);
    });
  })

});
