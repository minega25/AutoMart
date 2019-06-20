import request from 'supertest';
import server from '../../index';

describe('/api/v1/auth', async () => {
  afterEach(async () => {
    await server.close();
  });
  describe('POST /signup', async () => {
    let newUser;
    const exec = async (user) => {
      const res = await request(server).post('/api/v1/auth/signup').send(user);
      return res;
    };

    beforeEach(() => {
      newUser = {
        first_name: 'patrick',
        last_name: 'shyaka',
        email: 'kevin@gmail.com',
        password: 'PassWrd123@',
        address: 'adsfa',
        is_admin: true,
      };
    });
    afterEach(() => {
      newUser = {};
    });

    it('should return error message if user input validation fails', async () => {
      newUser.email = '';
      const res = await exec(newUser);
      expect(res.status).toBe(400);
    });

    it('should return user details after successfull sign up', async () => {
      const res = await exec(newUser);
      expect(res.status).toBe(201);
    });
  });

  describe('POST /signin', () => {
    let user;
    const exec = async () => {
      const res = await request(server).post('/api/v1/auth/signin').send(user);
      return res;
    };

    beforeEach(() => {
      user = {
        email: 'ineza.sandra@gmail.com',
        password: 'PassWord123@',
      };
    });
    afterEach(() => {
      user = {};
    });

    it('should return error message if user input validation fails', async () => {
      user.email = 'dd';
      const res = await exec();
      expect(res.status).toBe(400);
    });

    it('should return error message if user is not registered', async () => {
      user.email = 'usernotknown@gmail.com';
      const res = await exec();
      expect(res.status).toBe(400);
    });
  });
});
