/* eslint-disable max-len */
import Order from '../../models/Order';
import User from '../../models/User';
import Car from '../../models/Car';

describe('Order model', async () => {
  const car = new Car();
  const user = new User();
  const userCar = {
    email: 'userorder@gmail.com',
    first_name: 'abc',
    last_name: 'deg',
    password: '12345',
    address: 'deg',
  };
  const user1 = await user.add(userCar);

  let order1;
  const cardata = {
    state: 'new', price: 9000000, manufacturer: 'aaaa', model: 'x', body_type: 'jeep',
  };
  const cardata2 = {
    state: 'new', price: 9000000, manufacturer: 'aaaa', model: 'x', body_type: 'jeep',
  };
  const cardata3 = {
    state: 'new', price: 9000000, manufacturer: 'aaaa', model: 'x', body_type: 'jeep',
  };
  const car1 = await car.add(cardata);
  const car2 = await car.add(cardata2);
  const car3 = await car.add(cardata3);
  const order = new Order();
  beforeAll(async () => {
  });
  beforeEach(async () => {
    const data1 = {
      buyer: user1.id,
      car_id: car1.id,
      amount: 5000000,
      status: 'sdf',
    };
    const data2 = {
      buyer: user1.id,
      car_id: car2.id,
      amount: 4000000,
      status: 'sdf',
    };
    order1 = await order.add(data1);
    order2 = await order.add(data2);
  });

  it('should return a order with a given id', async () => {
    const result = await order.findById(order1.id);
    expect(result.id).toEqual(order1.id);
  });

  it('should add a order', async () => {
    const data3 = {
      buyer: user1.id,
      car_id: car3.id,
      amount: 400000,
      status: 'sdf',
    };
    const order3 = await order.add(data3);
    const result = await order.findById(order3.id);
    expect(result.id).toEqual(order3.id);
  });

  it('should update a order by Id', async () => {
    const data4 = {
      amount: 300000,
    };
    await order.update(order1.id, data4);
    const result = await order.findById(order1.id);
    expect(result.amount).toEqual(data4.amount);
  });
});
