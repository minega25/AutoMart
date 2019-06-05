import request from 'supertest';
import jwt from 'jsonwebtoken';
import config from 'config';
import uuid from 'uuid';
import server from '../../index';

describe('/api/v1/order', () => {
  afterEach(async () => {
    await server.close();
  });
  describe('POST /', () => {
    let newOrder;
    let userToken;

    // const newCar = {
    //   owner: 'minega shyaka patrick',
    //   state: 'used',
    //   status: 'available',
    //   price: 123456,
    //   manufacturer: 'toyota',
    //   model: 'RAV 4',
    //   body_type: 'Jeep',
    // };
    // const registerCar = async (token) => {
    //   const res = await request(server)
    //     .post('/api/v1/car')
    //     .set('x-auth-token', token || '')
    //     .send(newCar);
    //   return res;
    // };
    const exec = async (token) => {
      const res = await request(server)
        .post('/api/v1/order')
        .set('x-auth-token', token || '')
        .send(newOrder);
      return res;
    };

    beforeEach(async () => {
      // const car = await registerCar(userToken);
      // console.log(car.body.data.id);
      userToken = jwt.sign({ id: uuid.v4(), email: 'minega.patrick@gmail.com', isAdmin: false }, config.get('jwtPrivateKey'));
      newOrder = {
        buyer: 'minega shyaka',
        car_id: '175ce5c2-f678-4c13-88a0-3f54e67aa05d',
        status: 'pending',
        amount: '2,000,000',
      };
    });

    it('should return error message if user input validation fails', async () => {
      newOrder.owner = '';
      const res = await exec(userToken);
      expect(res.status).toBe(400);
    });

    it('should return error message if user not authenticated', async () => {
      userToken = '';
      const res = await exec(userToken);
      expect(res.status).toBe(401);
    });

    it('should return error if ordered car does not exist', async () => {
      newOrder.car_id = '175ce5c2-f678-4c13-88a0-3f54e67aa05e';
      const res = await exec(userToken);
      expect(res.status).toBe(400);
    });

    // it('should return order details if order submission is successfull', async () => {
    //   const res = await exec(userToken);
    //   expect(res.status).toBe(200);
    // });
  });
});
