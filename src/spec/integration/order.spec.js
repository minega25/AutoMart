import request from 'supertest';
import jwt from 'jsonwebtoken';
import config from 'config';
import uuid from 'uuid';
import server from '../../index';

describe('/api/v1/order', () => {
  let tempCar;
  let tempOrder;
  afterAll(async () => {
    await server.close();
  });
  describe('POST /', () => {
    let newOrder;
    let userToken;
    const newCar = {
      owner: 'minega shyaka patrick',
      state: 'used',
      status: 'available',
      price: 123456,
      manufacturer: 'toyota',
      model: 'RAV 4',
      body_type: 'Jeep',
    };

    const registerCar = async (token, car) => {
      const response = await request(server)
        .post('/api/v1/car')
        .set('x-auth-token', token || '')
        .send(car);
      return response;
    };

    const exec = async (token) => {
      const res = await request(server)
        .post('/api/v1/order')
        .set('x-auth-token', token || '')
        .send(newOrder);
      return res;
    };

    beforeEach(async () => {
      userToken = jwt.sign({ id: uuid.v4(), email: 'minega.patrick@gmail.com', isAdmin: false }, config.get('jwtPrivateKey'));
      newOrder = {
        buyer: 'patrick',
        car_id: 'f5a4535d-8241-4f0f-9c05-9608c405f0cb',
        status: 'pending',
        amount: 20000000,
      };
    });

    it('should return error message if user input validation fails', async () => {
      newOrder.buyer = '';
      const res = await exec(userToken);
      expect(res.status).toBe(400);
    });


    it('should return error if ordered car does not exist', async () => {
      newOrder.car_id = '175ce5c2-f678-4c13-88a0-3f54e67aa05e';
      const res = await exec(userToken);
      expect(res.status).toBe(400);
    });
  });


  describe('PATCH /<:order-id>/price', () => {
    let userToken;
    const price_offered = {
      new_price_offered: 1000000,
    };
    const exec = async (token, orderId) => {
      const res = await request(server)
        .patch(`/api/v1/order/${orderId}/price`)
        .set('Accept', 'application/json')
        .set('x-auth-token', token || '')
        .send(price_offered);
      return res;
    };

    beforeEach(() => {
      userToken = jwt.sign({ id: uuid.v4(), email: 'minega.patrick@gmail.com', isAdmin: false }, config.get('jwtPrivateKey'));
    });
    it('should return error message if car_id is not a valid id', async () => {
      const badId = 'ssss';
      const res = await exec(userToken, badId);
      expect(res.status).toBe(400);
    });

    it('should return error 400 message if order does not exist', async () => {
      const WrongId = '853d913f-4fc0-4aeb-825c-b3ba82c9dcd9';
      const res = await exec(userToken, WrongId);
      expect(res.status).toBe(400);
    });
  });
});
