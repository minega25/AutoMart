import request from 'supertest';
import jwt from 'jsonwebtoken';
import config from 'config';
import server from '../../index';

describe('/api/v1/flag', () => {
  let user;
  let tempCar;
  let tempFlag;
  beforeAll(async () => {
    const dummyUser = {
      first_name: 'patrick',
      last_name: 'shyaka',
      email: 'usertestflag@gmail.com',
      password: 'PassWrd123@',
      address: 'adsfa',
      is_admin: true,
    };
    const res = await request(server)
      .post('/api/v1/auth/signup')
      .send(dummyUser);
    user = res.body.data;
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
    const userToken = jwt.sign({ id: user.id, email: user.email, isAdmin: user.is_admin }, config.get('jwtPrivateKey'));
    tempCar = await registerCar(userToken, newCar);
  });
  afterAll(async () => {
    await server.close();
  });
  describe('POST /', () => {
    let newFlag;
    const exec = async (flag) => {
      const res = await request(server)
        .post('/api/v1/flag')
        .send(flag);
      return res;
    };

    beforeEach(() => {
      newFlag = {
        car_id: tempCar.body.data.id,
        reason: 'sdlfkalskdfjalsdkfja',
        description: 'asdfasdfasdfadsfadsfadfadfd',
      };
    });
    it('should return error if ordered car does not exist', async () => {
      newFlag.car_id = '175ce5c2-f678-4c13-88a0-3f54e67aa05e';
      const res = await exec(newFlag);
      expect(res.status).toBe(400);
    });
    it('should return car details after successfull flag registration', async () => {
      tempFlag = await exec(newFlag);
      expect(tempFlag.status).toBe(201);
    });
  });
});
