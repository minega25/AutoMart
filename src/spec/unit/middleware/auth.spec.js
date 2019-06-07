import uuid from 'uuid';
import jwt from 'jsonwebtoken';
import config from 'config';
import httpMocks from 'node-mocks-http';
import auth from '../../../middleware/auth';

describe('auth middleware', () => {
  it('should populate req.user with the payload of a valid JWT', () => {
    const user = {
      _id: uuid.v4(),
      isAdmin: true,
    };
    const token = jwt.sign(user, config.get('jwtPrivateKey'));
    const req = httpMocks.createRequest({
      method: 'GET',
      url: '/api/v1/auth',
      headers: {
        'x-auth-token': token,
      },
    });
    const res = httpMocks.createResponse();
    const next = {};
    auth(req, res, next);

    expect(req.user).toEqual(jasmine.objectContaining(user));
  });
});
