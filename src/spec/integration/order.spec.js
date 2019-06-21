import request from 'supertest';
import jwt from 'jsonwebtoken';
import config from 'config';
import server from '../../index';

describe('/api/v1/order', () => {
  let user;
  let user2;
  let tempCar;
  let tempOrder;
  beforeAll(async () => {
    const dummyUser = {
      first_name: 'patrick',
      last_name: 'shyaka',
      email: 'usertestorder@gmail.com',
      password: 'PassWrd123@',
      address: 'adsfa',
      is_admin: true,
    };
    const dummyUser2 = {
      first_name: 'patrick',
      last_name: 'shyaka',
      email: 'usertestorder2@gmail.com',
      password: 'PassWrd123@',
      address: 'adsfa',
    };
    const res = await request(server)
      .post('/api/v1/auth/signup')
      .send(dummyUser);
    const res2 = await request(server)
      .post('/api/v1/auth/signup')
      .send(dummyUser2);
    user = res.body.data;
    user2 = res2.body.data;
  });
  afterAll(async () => {
    await server.close();
  });
  describe('POST /', () => {
    let newOrder;
    let userToken;
    const newCar = {
      state: 'used',
      price: 9000000,
      manufacturer: 'aaaa',
      model: 'x',
      body_type: 'jeep',
    };

    const registerCar = async (token, car) => {
      const response = await request(server)
        .post('/api/v1/car')
        .set('x-auth-token', token || '')
        .send(car);
      return response;
    };

    const exec = async (token, order) => {
      const res = await request(server)
        .post('/api/v1/order')
        .set('x-auth-token', token || '')
        .send(order);
      return res;
    };

    beforeEach(async () => {
      userToken = jwt.sign({ id: user.id, email: user.email, isAdmin: user.is_admin }, config.get('jwtPrivateKey'));
      newOrder = {
        car_id: '',
        status: 'pending',
        amount: 4000000,
      };
    });
    it('should return success if order registered', async () => {
      tempCar = await registerCar(userToken, newCar);
      const buyerToken = jwt.sign({ id: user2.id, email: user2.email, isAdmin: user2.is_admin }, config.get('jwtPrivateKey'));
      newOrder.car_id = tempCar.body.data.id;
      tempOrder = await exec(buyerToken, newOrder);
      expect(tempOrder.status).toBe(201);
    });

    it('should return error message if user input validation fails', async () => {
      newOrder.amount = 'dd';
      const buyerToken = jwt.sign({ id: user2.id, email: user2.email, isAdmin: user2.is_admin }, config.get('jwtPrivateKey'));
      const res = await exec(userToken, buyerToken);
      expect(res.status).toBe(400);
    });

    it('should return error message if user is trying to order own car', async () => {
      newOrder.car_id = tempCar.body.data.id;
      const res = await exec(userToken, newOrder);
      expect(res.status).toBe(400);
    });

    it('should return error if ordered car does not exist', async () => {
      newOrder.car_id = '175ce5c2-f678-4c13-88a0-3f54e67aa05e';
      const buyerToken = jwt.sign({ id: user2.id, email: user2.email, isAdmin: user2.is_admin }, config.get('jwtPrivateKey'));
      const res = await exec(buyerToken, newOrder);
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
      userToken = jwt.sign({ id: user2.id, email: user2.email, isAdmin: user2.is_admin }, config.get('jwtPrivateKey'));
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
    it('should return success if order is updated', async () => {
      const res = await exec(userToken, tempOrder.body.data.id);
      expect(res.status).toBe(200);
    });
  });
});
