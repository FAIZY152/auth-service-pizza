import { DataSource } from 'typeorm';
import { AppDataSource } from '../../src/config/data-source';
import request from 'supertest';
import bcrypt from 'bcrypt';
import { User } from '../../src/entity/User';
import { isJwt } from '../utils';
import app from '../../src/App';
import { Roles } from '../../src/constants';
import createJWKSMock from 'mock-jwks';

describe('GET /auth/self', () => {
  let connection: DataSource;
  let jwks: ReturnType<typeof createJWKSMock>;

  beforeAll(async () => {
    jwks = createJWKSMock('http://localhost:5501');
    connection = await AppDataSource.initialize();
  });

  beforeEach(async () => {
    jwks.start();
    await connection.dropDatabase();
    await connection.synchronize();
  });

  afterEach(() => {
    jwks.stop();
  });

  afterAll(async () => {
    await connection.destroy();
  });

  describe('Given all fields ', () => {
    it("should return the user's details", async () => {
      const response = await request(app).get('/auth/self');

      // Assert
      expect(response.statusCode).toBe(200);
    });
  });
});
