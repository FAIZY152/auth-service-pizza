import supertest from 'supertest';
import app from './src/App';

//describe('component name' , () => {});

describe.skip('App', () => {
  // For Api testing use supertest
  it('should return 200 status code', async () => {
    const response = await supertest(app).get('/').send();
    expect(response.status).toBe(200);
  });
});
