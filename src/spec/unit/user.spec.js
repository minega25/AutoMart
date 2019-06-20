/* eslint-disable max-len */
import User from '../../models/User';

describe('User model', () => {
  let user;
  let user1;
  let user2;
  beforeAll(async () => {
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

  it('should return a user with a given id', async () => {
    const result = await user.findById(user1.id);
    expect(result.id).toEqual(user1.id);
  });

  it('should add a user', async () => {
    const data3 = {
      email: 'data3@gmail.com',
      first_name: 'abc',
      last_name: 'deg',
      password: '12345',
      address: 'deg',
    };
    const user3 = await user.add(data3);
    const registeredUser = await user.findById(user3.id);
    expect(registeredUser.id).toEqual(user3.id);
  });
});
