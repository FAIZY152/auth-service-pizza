import request from 'supertest';
import app from '../../src/App';

describe('POST  /auth/register', () => {
  describe('Diven all fields ', () => {
    it('should return the 201 status code', async () => {
      // Arrange
      const userData = {
        firstName: 'Rakesh',
        lastName: 'K',
        email: 'rakesh@mern.space',
        password: 'password',
      };
      // Act
      const response = await request(app).post('/auth/register').send(userData);

      // Assert
      expect(response.statusCode).toBe(201);
    });
  });

  describe('Missing Information', () => {});
});
