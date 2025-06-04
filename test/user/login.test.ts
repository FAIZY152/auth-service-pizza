import { DataSource } from 'typeorm';
import { AppDataSource } from '../../src/config/data-source';
import request from 'supertest';

import { isJwt } from '../utils';
import app from '../../src/App';

describe('POST  /auth/login', () => {
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
        email: 'ali@gmail.com',
        password: 'password',
      };
      // Act
      const response = await request(app).post('/auth/register').send(userData);

      // Assert
      expect(response.statusCode).toBe(201);
    });
  });
});
