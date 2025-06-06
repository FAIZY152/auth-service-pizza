import { DataSource } from 'typeorm';
import { AppDataSource } from '../../src/config/data-source';
import request from 'supertest';
import bcrypt from 'bcrypt';

import { Roles } from '../../src/constants';
import createJWKSMock from 'mock-jwks';
import { User } from '../../src/entity/User';
import app from '../../src/App'; // Make sure this matches your actual file name

describe('GET /auth/self', () => {
  let connection: DataSource;
  const jwksUrl = 'http://localhost:5501';

  let jwks: ReturnType<typeof createJWKSMock>;

  beforeAll(async () => {
    jwks = createJWKSMock(jwksUrl);
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
    it('should return the user data', async () => {
      // Register user
      const userData = {
        firstName: 'Muhammad',
        lastName: 'Ali',
        email: 'ali@gmail.com',
        password: await bcrypt.hash('password', 10),
        role: Roles.CUSTOMER,
      };
      const userRepository = connection.getRepository(User);
      const data = await userRepository.save(userData);

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
      expect(response.statusCode).toBe(200);
      expect(response.body.id).toBe(data.id);
      expect(response.body.email).toBe(data.email);
      expect(response.body.firstName).toBe(data.firstName);
      expect(response.body.lastName).toBe(data.lastName);
      expect(response.body.role).toBe(data.role);
    });
  });
});
