import { DataSource } from 'typeorm';
import request from 'supertest';
import { AppDataSource } from '../../src/config/data-source';
import createJWKSMock from 'mock-jwks';
import { Roles } from '../../src/constants';
import { Tenant } from '../../src/entity/Tenate';
import app from '../../src/App';
import { User } from '../../src/entity/User';

describe('POST /users', () => {
  let connection: DataSource;
  let jwks: ReturnType<typeof createJWKSMock>;
  let adminToken: string;

  beforeAll(async () => {
    connection = await AppDataSource.initialize();
    jwks = createJWKSMock('http://localhost:5501');
  });

  beforeEach(async () => {
    await connection.dropDatabase();
    await connection.synchronize();
    jwks.start();

    adminToken = jwks.token({
      sub: '1',
      role: Roles.ADMIN,
    });
  });

  afterAll(async () => {
    await connection.destroy();
  });

  afterEach(() => {
    jwks.stop();
  });

  describe('Given all fields', () => {
    it('should return the user data', async () => {
      // Register user
      const userData = {
        firstName: 'Muhammad',
        lastName: 'Ali',
        email: 'ali@gmail.com',
        password: 'password',
      };
      const userRepository = connection.getRepository(User);
      const data = await userRepository.save({
        ...userData,
        role: Roles.CUSTOMER,
      });
      // Generate token
      const accessToken = jwks.token({
        sub: String(data.id),
        role: data.role,
      });

      // Add token to cookie
      const response = await request(app)
        .get('/auth/self')
        .set('Cookie', [`accessToken=${accessToken};`])
        .send();
      // Assert
      // Check if user id matches with registered user
      expect((response.body as Record<string, string>).id).toBe(data.id);
    });

    it('should not return the password field', async () => {
      // Register user
      const userData = {
        firstName: 'Muhammad',
        lastName: 'Ali',
        email: 'ali@gmail.com',
        password: 'password',
      };
      const userRepository = connection.getRepository(User);
      const data = await userRepository.save({
        ...userData,
        role: Roles.CUSTOMER,
      });
      // Generate token
      const accessToken = jwks.token({
        sub: String(data.id),
        role: data.role,
      });

      // Add token to cookie
      const response = await request(app)
        .get('/auth/self')
        .set('Cookie', [`accessToken=${accessToken};`])
        .send();
      // Assert
      // Check if user id matches with registered user
      expect(response.body as Record<string, string>).not.toHaveProperty(
        'password',
      );
    });

    it('should return 401 status code if token does not exists', async () => {
      // Register user
      const userData = {
        firstName: 'Muhammad',
        lastName: 'Ali',
        email: 'ali@gmail.com',
        password: 'password',
      };
      const userRepository = connection.getRepository(User);
      await userRepository.save({
        ...userData,
        role: Roles.CUSTOMER,
      });

      // Add token to cookie
      const response = await request(app).get('/auth/self').send();
      // Assert
      expect(response.statusCode).toBe(401);
    });
  });
});
