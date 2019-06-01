const request = require('supertest');
// const User = require('../../models/User');

// const users = new User();

let server;
describe('/api/v1/auth', () => {
  // eslint-disable-next-line global-require
  beforeEach(() => { server = require('../../index'); });

  afterEach(async () => {
    await server.close();
  });

  describe('POST /signup', () => {
    // let Registereduser;
    let newUser;
    const exec = async () => {
      const res = await request(server).post('/api/v1/auth/signup').send(newUser);
      return res;
    };

    beforeEach(() => {
      newUser = {
        first_name: 'ineza',
        last_name: 'sandra',
        email: 'ineza.sandra@gmail.com',
        password: 'password',
        address: 'kg120st',
      };
      //   Registereduser = users.add();
    });

    it('should return error message if user input validation fails', async () => {
      newUser.email = 'dd';
      const res = await exec();
      expect(res.status).toBe(400);
    });

    it('should return user details after successfull sign up', async () => {
        const res = await exec();
        expect(res.status).toBe(200);
      });

    it('should return user already registered if user attemps to signup again', async () => {
      await exec();
      const res = await exec();
      expect(res.status).toBe(400);
    });

  });
});
