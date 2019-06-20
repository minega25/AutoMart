import request from 'supertest';
import jwt from 'jsonwebtoken';
import config from 'config';
import uuid from 'uuid';
import server from '../../index';

describe('/api/v1/car', () => {
  let user;
  let userToken;
  let tempCar;
  beforeAll(async () => {
    const dummyUser = {
      first_name: 'patrick',
      last_name: 'shyaka',
      email: 'usertest@gmail.com',
      password: 'PassWrd123@',
      address: 'adsfa',
      is_admin: true,
    };
    const res = await request(server)
      .post('/api/v1/auth/signup')
      .send(dummyUser);
    user = res.body.data;
  });
  afterAll(async () => {
    await server.close();
  });
  describe('POST /', () => {
    let newCar;
    const exec = async (token) => {
      const res = await request(server)
        .post('/api/v1/car')
        .set('x-auth-token', token || '')
        .send(newCar);
      return res;
    };

    beforeEach(() => {
      userToken = jwt.sign({ id: user.id, email: user.email, isAdmin: user.is_admin }, config.get('jwtPrivateKey'));
      newCar = {
        state: 'new',
        price: 9000000,
        manufacturer: 'aaaa',
        model: 'x',
        body_type: 'jeep',
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
      tempCar = await exec(userToken);
      expect(tempCar.status).toBe(201);
    });
  });
  describe('PATCH /<:car-id>/status', () => {
    const exec = async (token, carId) => {
      const res = await request(server)
        .patch(`/api/v1/car/${carId}/status`)
        .set('x-auth-token', token || '');
      return res;
    };

    beforeEach(() => {
      userToken = jwt.sign({ id: uuid.v4(), email: 'minega.patrick@gmail.com', isAdmin: false }, config.get('jwtPrivateKey'));
    });

    it('should return error message if user not authenticated', async () => {
      userToken = '';
      const res = await exec(userToken);
      expect(res.status).toBe(401);
    });
  });
  describe('GET /<:car-id>', () => {
    let newCar;
    const exec = async (token, carId) => {
      const res = await request(server)
        .get(`/api/v1/car/${carId}`)
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
    afterEach(() => {

    });
    it('should return error message if car_id is not a valid id', async () => {
      newCar.id = 'ssss';
      const res = await exec(userToken, newCar.id);
      expect(res.status).toBe(400);
    });
  });

  describe('PATCH /<:car-id>/price', () => {
    const newPrice = {
      price: 70000000,
    };
    const exec = async (token, carId) => {
      const res = await request(server)
        .patch(`/api/v1/car/${carId}/price`)
        .set('x-auth-token', token || '')
        .send(newPrice);
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

    it('should return error message if car does not exist', async () => {
      const badId = 'fcc10a6f-da1d-41a5-ae18-81b815a98d19';
      const res = await exec(userToken, badId);
      expect(res.status).toBe(400);
    });

    it('should return error message if user not authenticated', async () => {
      userToken = '';
      const res = await exec(userToken);
      expect(res.status).toBe(401);
    });
  });
  describe('DELETE /<:car-id>', () => {
    const exec = async (token, carId) => {
      const res = await request(server)
        .delete(`/api/v1/car/${carId}`)
        .set('x-auth-token', token || '');
      return res;
    };
    beforeEach(async () => {
      userToken = jwt.sign({ id: user.id, email: user.email, isAdmin: user.is_admin }, config.get('jwtPrivateKey'));
    });

    it('should return error message if car_id is not a valid id', async () => {
      const badId = 'ssss';
      const res = await exec(userToken, badId);
      expect(res.status).toBe(400);
    });

    it('should return error message if car does not exist', async () => {
      const badId = 'fcc10a6f-da1d-41a5-ae18-81b815a98d19';
      const res = await exec(userToken, badId);
      expect(res.status).toBe(400);
    });

    it('should return error message if user not authenticated', async () => {
      userToken = '';
      const res = await exec(userToken);
      expect(res.status).toBe(401);
    });

    it('should return car deleted successfully if user is admin', async () => {
      const res = await exec(userToken, tempCar.body.data.id);
      expect(res.status).toBe(200);
    });
  });
});
