import request from 'supertest';
import jwt from 'jsonwebtoken';
import config from 'config';
import uuid from 'uuid';
import server from '../../index';

describe('/api/v1/car', () => {
  afterEach(async () => {
    await server.close();
  });
  describe('POST /', () => {
    let newCar;
    let userToken;
    const exec = async (token) => {
      const res = await request(server)
        .post('/api/v1/car')
        .set('x-auth-token', token || '')
        .send(newCar);
      return res;
    };

    beforeEach(() => {
      userToken = jwt.sign({ id: uuid.v4(), email: 'minega.patrick@gmail.com', isAdmin: false }, config.get('jwtPrivateKey'));
      newCar = {
        owner: 'minega shyaka patrick',
        state: 'used',
        status: 'available',
        price: 123456,
        manufacturer: 'toyota',
        model: 'RAV 4',
        body_type: 'Jeep',
      };
    });

    it('should return error message if user input validation fails', async () => {
      newCar.state = '';
      const res = await exec(userToken);
      expect(res.status).toBe(400);
    });

    it('should return error message if user not authenticated', async () => {
      userToken = '';
      const res = await exec(userToken);
      expect(res.status).toBe(401);
    });

    it('should return car details after successfull car registration', async () => {
      const res = await exec(userToken);
      expect(res.status).toBe(200);
    });
  });
  describe('PATCH /<:car-id>/status', () => {
    let userToken;
    let newCar;
    const exec = async (token, carId) => {
      const res = await request(server)
        .patch(`/api/v1/car/${carId}/status`)
        .set('x-auth-token', token || '');
      return res;
    };

    beforeEach(() => {
      userToken = jwt.sign({ id: uuid.v4(), email: 'minega.patrick@gmail.com', isAdmin: false }, config.get('jwtPrivateKey'));
      newCar = {
        id: '28dc2cc2-672f-4673-bcf1-14e4dfc609cd',
        email: '',
        state: 'used',
        status: 'available',
        price: 2000000,
        manufacturer: 'a',
        model: 'a',
        body_type: 'a',
        createdDate: 'Thu Jun 13 2019 12:53:07 GMT+0200',
        modifiedDate: 'Thu Jun 13 2019 12:53:07 GMT+0200',
      };
    });
    it('should return error message if car_id is not a valid id', async () => {
      newCar.id = 'ssss';
      const res = await exec(userToken, newCar.id);
      expect(res.status).toBe(400);
    });

    it('should return error message if user not authenticated', async () => {
      userToken = '';
      const res = await exec(userToken);
      expect(res.status).toBe(401);
    });

    // it('should return car details after successfull car registration', async () => {
    //   const res = await exec(userToken);
    //   expect(res.status).toBe(200);
    // });
  });
});
