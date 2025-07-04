import { Roles } from './../../src/constants/index';
import 'reflect-metadata';
import { AppDataSource } from './../../src/config/data-source';
import { User } from './../../src/entity/User';
import request from 'supertest';
import app from '../../src/App';
import { DataSource } from 'typeorm';
import { isJwt } from '../utils';

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
    it('should return an id of the created user', async () => {
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
      expect(response.body).toHaveProperty('id');
      const repository = connection.getRepository(User);
      const users = await repository.find();
      expect((response.body as Record<string, string>).id).toBe(users[0].id);
    });

    it('should assign a customer role', async () => {
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
      expect(users[0]).toHaveProperty('role');
      expect(users[0].role).toBe(Roles.CUSTOMER);
    });
    it('should store the hashed password in the database', async () => {
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
      const users = await userRepository.find({ select: ['password'] });
      expect(users[0].password).not.toBe(userData.password);
      expect(users[0].password).toHaveLength(60);
      expect(users[0].password).toMatch(/^\$2[a|b]\$\d+\$/);
    });

    it('should return 400 status code if email is already exists', async () => {
      // Arrange
      const userData = {
        firstName: 'Muhammad',
        lastName: 'Ali',
        email: 'ali@gmail.com',
        password: 'password',
      };
      const userRepository = connection.getRepository(User);
      await userRepository.save({ ...userData, role: Roles.CUSTOMER });

      // Act
      const response = await request(app).post('/auth/register').send(userData);

      const users = await userRepository.find();
      // Assert
      expect(response.statusCode).toBe(400);
      expect(response.body.message).toBe('Email is already exists!');
      expect(users).toHaveLength(1);
    });

    it('should return the access token and refresh token inside a cookie', async () => {
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
      let accessToken: string | null = null;
      let refreshToken: string | null = null;
      const rawCookies = response.headers['set-cookie'] || [];
      const cookies = Array.isArray(rawCookies) ? rawCookies : [rawCookies];
      // accessToken=eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjkzOTA5Mjc2LCJleHAiOjE2OTM5MDkzMzYsImlzcyI6Im1lcm5zcGFjZSJ9.KetQMEzY36vxhO6WKwSR-P_feRU1yI-nJtp6RhCEZQTPlQlmVsNTP7mO-qfCdBr0gszxHi9Jd1mqf-hGhfiK8BRA_Zy2CH9xpPTBud_luqLMvfPiz3gYR24jPjDxfZJscdhE_AIL6Uv2fxCKvLba17X0WbefJSy4rtx3ZyLkbnnbelIqu5J5_7lz4aIkHjt-rb_sBaoQ0l8wE5KzyDNy7mGUf7cI_yR8D8VlO7x9llbhvCHF8ts6YSBRBt_e2Mjg5txtfBaDq5auCTXQ2lmnJtMb75t1nAFu8KwQPrDYmwtGZDkHUcpQhlP7R-y3H99YnrWpXbP8Zr_oO67hWnoCSw; Max-Age=43200; Domain=localhost; Path=/; Expires=Tue, 05 Sep 2023 22:21:16 GMT; HttpOnly; SameSite=Strict
      cookies.forEach((cookie: string) => {
        if (cookie.startsWith('accessToken=')) {
          accessToken = cookie.split(';')[0].split('=')[1];
        }

        if (cookie.startsWith('refreshToken=')) {
          refreshToken = cookie.split(';')[0].split('=')[1];
        }
      });
      expect(accessToken).not.toBeNull();
      expect(refreshToken).not.toBeNull();

      expect(isJwt(accessToken)).toBeTruthy();
      expect(isJwt(refreshToken)).toBeTruthy();
    });
  });

  describe('Missing Information', () => {
    it('should return 400 status code if email field is missing', async () => {
      // Arrange
      const userData = {
        firstName: 'Muhammad',
        lastName: 'Ali',
        email: '',
        password: 'password',
      };
      // Act
      const response = await request(app).post('/auth/register').send(userData);

      // Assert
      expect(response.statusCode).toBe(400);
      const userRepository = connection.getRepository(User);
      const users = await userRepository.find();
      expect(users).toHaveLength(0);
    });

    it('should return 400 status code if firstName is missing', async () => {
      // Arrange
      const userData = {
        firstName: '',
        lastName: 'Ali',
        email: 'ali@gmail.com',
        password: 'password',
      };
      // Act
      const response = await request(app).post('/auth/register').send(userData);

      // Assert
      expect(response.statusCode).toBe(400);
      const userRepository = connection.getRepository(User);
      const users = await userRepository.find();
      expect(users).toHaveLength(0);
    });
    it('should return 400 status code if lastName is missing', async () => {
      // Arrange
      const userData = {
        firstName: 'Muhammad',
        lastName: '',
        email: 'ali@gmail.com',
        password: 'password',
      };
      // Act
      const response = await request(app).post('/auth/register').send(userData);

      // Assert
      expect(response.statusCode).toBe(400);
      const userRepository = connection.getRepository(User);
      const users = await userRepository.find();
      expect(users).toHaveLength(0);
    });

    it('should return 400 status code if password is missing', async () => {
      // Arrange
      const userData = {
        firstName: 'Muhammad',
        lastName: 'Ali',
        email: 'ali@gmail.com',
        password: '',
      };
      // Act
      const response = await request(app).post('/auth/register').send(userData);

      // Assert
      expect(response.statusCode).toBe(400);
      const userRepository = connection.getRepository(User);
      const users = await userRepository.find();
      expect(users).toHaveLength(0);
    });
  });
});
