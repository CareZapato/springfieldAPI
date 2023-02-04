const supertest = require('supertest');
const {app}= require('../../../index');

describe('GET /characters/:filter', () => {
  it('should return a 200', async () => {
    const characterName = "Milhouse;"
    await supertest(app).get(`/characters/${characterName}`).expect(200);
  });

  it('should return a 200', async () => {
    await supertest(app).get(`/characters`).expect(200);
  });
});
