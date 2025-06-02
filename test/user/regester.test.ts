import 'reflect-metadata';
import { AppDataSource } from './../../src/config/data-source';
import { User } from './../../src/entity/User';
import request from 'supertest';
import app from '../../src/App';
import { DataSource } from 'typeorm';

describe('POST  /auth/register', () => {
  let connection: DataSource;

  beforeAll(async () => {
    connection = await AppDataSource.initialize();
  });

  beforeEach(async () => {
    // Database truncate
    await connection.dropDatabase();
    await connection.synchronize();
  });

  afterAll(async () => {
    await connection.destroy();
  });

  describe('Diven all fields ', () => {
    it('should return the 201 status code', async () => {
      // Arrange
      const userData = {
        firstName: 'Muhammad',
        lastName: 'Ali',
        email: 'ali@gmail.com',
        password: 'password',
      };
      // Act
      const response = await request(app).post('/auth/register').send(userData);

      // Assert
      expect(response.statusCode).toBe(201);
    });
    it('should return valid json response', async () => {
      // Arrange
      const userData = {
        firstName: 'Muhammad',
        lastName: 'Ali',
        email: 'ali@gmail.com',
        password: 'password',
      };
      // Act
      const response = await request(app).post('/auth/register').send(userData);

      // Assert application/json utf-8
      expect(
        (response.headers as Record<string, string>)['content-type'],
      ).toEqual(expect.stringContaining('json'));
    });

    it('should persist the user in the database', async () => {
      // Arrange
      const userData = {
        firstName: 'Muhammad',
        lastName: 'Ali',
        email: 'ali@gmail.com',
        password: 'password',
      };
      // Act
      await request(app).post('/auth/register').send(userData);

      // Assert
      const userRepository = connection.getRepository(User);
      const users = await userRepository.find();
      expect(users).toHaveLength(1);
      // expect(users[0].firstName).toBe(userData.firstName);
      // expect(users[0].lastName).toBe(userData.lastName);
      // expect(users[0].email).toBe(userData.email);
    });
  });

  describe('Missing Information', () => {});
});
