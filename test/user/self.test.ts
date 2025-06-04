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
    // it('should return the 200 status code', async () => {
    //   const accessToken = jwks.token({
    //     sub: '1',
    //     role: Roles.CUSTOMER,
    //   });
    //   const response = await request(app)
    //     .get('/auth/self')
    //     .set('Cookie', [`accessToken=${accessToken}`])
    //     .send();
    //   expect(response.statusCode).toBe(200);
    // });

    // it('should return the user data', async () => {
    //   // Register user
    //   const userData = {
    //     firstName: 'Muhammad',
    //     lastName: 'Ali',
    //     email: 'ali@gmail.com',
    //     password: 'password',
    //   };
    //   const userRepository = connection.getRepository(User);
    //   const data = await userRepository.save({
    //     ...userData,
    //     role: Roles.CUSTOMER,
    //   });
    //   // Generate token
    //   const accessToken = jwks.token({
    //     sub: String(data.id),
    //     role: data.role,
    //   });

    //   // Add token to cookie
    //   const response = await request(app)
    //     .get('/auth/self')
    //     .set('Cookie', [`accessToken=${accessToken};`])
    //     .send();
    //   // Assert
    //   // Check if user id matches with registered user
    //   expect((response.body as Record<string, string>).id).toBe(data.id);
    // });
  });
});
