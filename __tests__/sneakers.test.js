const request = require('supertest');

const server = require('../index');

const { Builder } = require('../builders/sneakers.builder');
/* const { store } = require('../services/sneakers-service'); */

jest.mock('../services/sneakers-service.js');
beforeEach(() => {
  store.mockReset();
});

describe('POST/sneakers', () => {
  test('should store a new sneaker', async () => {
    const sneaker = Builder.sneaker();
    const response = await request(server)
      .post('/sneakers')
      .send(sneaker)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201);

    const {_id, createdAt, updatedAt, __v,...storedSneaker } = response.body;

    expect(storedSneaker).toEqual(sneaker);
  });
});
