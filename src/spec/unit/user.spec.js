/* eslint-disable max-len */
const User = require('../../models/User');

describe('User model', () => {
  let user;
  let user1;
  let user2;
  beforeEach(async () => {
    user = new User();
    const data1 = {
      email: 'abc@gmail.com',
      first_name: 'minega',
      last_name: 'kevin',
      password: '12345',
      address: 'abc',
      is_admin: true,
    };
    const data2 = {
      email: 'deg@gmail.com',
      first_name: 'abc',
      last_name: 'deg',
      password: '12345',
      address: 'deg',
    };
    user1 = await user.add(data1);
    user2 = await user.add(data2);
  });
  afterEach(async () => {
    user = {};
  });
  it('should return a user with a given id', () => {
    const result = user.findById(user1.id);
    expect(result).toEqual(jasmine.objectContaining({ id: user1.id, is_admin: true }));
  });

  it('should return a user based on any attribute', () => {
    const result = user.findOne({ email: 'deg@gmail.com' });
    expect(result).toEqual(jasmine.objectContaining({ email: 'deg@gmail.com' }));
  });

  it('should return all registered users ', () => {
    const result = user.findAll();
    // eslint-disable-next-line max-len
    expect(result).toEqual(jasmine.objectContaining([jasmine.objectContaining({ id: user1.id, is_admin: true }), jasmine.objectContaining({ id: user2.id, is_admin: false })]));
  });

  it('should delete a user by id', () => {
    const result = user.delete(user1.id);
    expect(result).not.toEqual(jasmine.objectContaining([jasmine.objectContaining({ id: user1.id, is_admin: true })]));
  });

  it('should add a user', async () => {
    const data3 = {
      email: 'deg@gmail.com',
      first_name: 'abc',
      last_name: 'deg',
      password: '12345',
      address: 'deg',
    };
    const user3 = await user.add(data3);
    const allusers = user.findAll();
    expect(allusers).toEqual(
      [
        jasmine.objectContaining({ id: user1.id, is_admin: true }),
        jasmine.objectContaining({ id: user2.id, is_admin: false }),
        jasmine.objectContaining({ id: user3.id, is_admin: false }),
      ],
    );
  });

  it('should update a user by Id', async () => {
    const data4 = {
      email: 'deg@gmail.com',
      first_name: 'abc',
      last_name: 'deg',
      password: 'abcde',
      address: 'deg',
    };
    const result = await user.update(user1.id, data4);
    expect(result).toEqual(jasmine.objectContaining(
      [
        jasmine.objectContaining({ id: user1.id, is_admin: true }),
        jasmine.objectContaining({ id: user2.id, is_admin: false }),
      ],
    ));
  });
});
