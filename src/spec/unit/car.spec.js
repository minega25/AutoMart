// const uuid = require('uuid');
import Car from '../../models/Car';
import User from '../../models/User';

describe('Car model', async () => {
  const car = new Car();
  const user = new User();
  const userCar = {
    email: 'usercar@gmail.com',
    first_name: 'abc',
    last_name: 'deg',
    password: '12345',
    address: 'deg',
  };

  const user1 = await user.add(userCar);
  const data1 = {
    state: 'new',
    price: 9000000,
    manufacturer: 'aaaa',
    model: 'x',
    body_type: 'jeep',
  };
  const data2 = {
    state: 'used',
    price: 4000000,
    manufacturer: 'aaaa',
    model: 'x',
    body_type: 'jeep',
  };
  const data3 = {
    state: 'used',
    price: 5000000,
    manufacturer: 'aaaa',
    model: 'x',
    body_type: 'jeep',
  };
  const car1 = await car.add(data1);
  const car3 = await car.add(data3);
  const car2 = await car.add(data2);

  it('should return a car with a given id', async () => {
    const result = await car.findById(car1.id);
    expect(result.id).toEqual(car1.id);
  });

  it('should return all unsold cars', async () => {
    const result = await car.findUnsold();
    expect(result).toEqual(jasmine.objectContaining([jasmine.objectContaining({ id: car2.id, status: 'available' }), jasmine.objectContaining({ id: car3.id, status: 'available' })]));
  });

  it('should return all cars within the fleet', async () => {
    const result = await car.findAll();
    expect(result).toEqual(jasmine.objectContaining([jasmine.objectContaining({ id: car1.id, state: 'used' }), jasmine.objectContaining({ id: car2.id, state: 'used' })]));
  });

  it('should delete a car within the fleet by id', async () => {
    await car.delete(car1.id);
    const result = await car.findById(car1.id);
    expect(result).toBeFalsy();
  });

  it('should return all cars within a min and max price range', async () => {
    const min = 2000000;
    const max = 3000000;
    const result = await car.findByPrice(min, max);
    expect(result).toEqual(jasmine.objectContaining([jasmine.objectContaining({ id: car2.id, state: 'used' }), jasmine.objectContaining({ id: car3.id, state: 'used' })]));
  });

  it('should add a car to a fleet', async () => {
    const data4 = {
      state: 'used',
      price: 9000000,
      manufacturer: 'aaaa',
      model: 'x',
      body_type: 'jeep',
    };
    const car4 = await car.add(data4);
    const result = await car.findById(car4.id);
    expect(result.id).toEqual(car4.id);
  });

  it('should update a car in a fleet by Id', async () => {
    const data4 = {
      state: 'new',
      price: 900000,
      manufacturer: 'aaaa',
      model: 'x',
      body_type: 'jeep',
    };
    await car.update(car1.id, data4);
    const result = await car.findById(car1.id);
    expect(result.price).toEqual(data4.price);
  });
});
