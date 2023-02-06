const supertest = require('supertest');
const {app}= require('../../../index');

describe('GET /springfield/citizens/:filter', () => {
  it('should return a 200', async () => {
    const characterName = "Milhouse;"
    await supertest(app).get(`/springfield/citizens/${characterName}`).expect(200);
  });
});

describe('GET /springfield/citizens/', () => {

  it('should return a 200', async () => {
    await supertest(app).get(`/springfield/citizens/`).expect(200);
  });
});

describe('POST /springfield/citizens/addCitizen', () => {

  it('should return a 200', async () => {
    await supertest(app).post(`/springfield/citizens/addCitizen`).expect(200);
  });
});

describe('PUT /springfield/citizens/markAsDeceased/:name', () => {

  it('should return a 200', async () => {
    await supertest(app).put(`/springfield/citizens/markAsDeceased/:name`).expect(200);
  });
});

