// const uuid = require('uuid');
import Car from '../../models/Car';

describe('Car model', () => {
  let car;
  let car1;
  let car2;
  beforeEach(async () => {
    car = new Car();
    const data1 = {
      owner: 1,
      state: 'used',
      status: 'available',
      price: '39393939',
      manufacturer: 'a',
      model: 'a',
      body_type: 'a',
    };
    const data2 = {
      owner: 1,
      state: 'used',
      status: 'available',
      price: '39393939',
      manufacturer: 'a',
      model: 'a',
      body_type: 'a',
    };
    car1 = car.add(data1);
    car2 = car.add(data2);
  });
  afterEach(async () => {
    car = {};
  });
  it('should return a car with a given id', () => {
    const result = car.findById(car1.id);
    expect(result).toEqual(jasmine.objectContaining({ id: car1.id, state: 'used' }));
  });

  it('should return all cars within the fleet', () => {
    const result = car.findAll();
    expect(result).toEqual(jasmine.objectContaining([jasmine.objectContaining({ id: car1.id, state: 'used' }), jasmine.objectContaining({ id: car2.id, state: 'used' })]));
  });

  it('should delete a car within the fleet by id', () => {
    const result = car.delete(car1.id);
    expect(result).not.toEqual(jasmine.objectContaining([jasmine.objectContaining({ id: car1.id, state: 'used' })]));
  });

  it('should add a car to a fleet', async () => {
    const data3 = {
      owner: 1,
      state: 'used',
      status: 'available',
      price: '39393939',
      manufacturer: 'a',
      model: 'a',
      body_type: 'a',
    };
    const car3 = car.add(data3);
    const allCars = car.findAll();
    expect(allCars).toEqual(
      [
        jasmine.objectContaining({ id: car1.id, state: 'used' }),
        jasmine.objectContaining({ id: car2.id, state: 'used' }),
        jasmine.objectContaining({ id: car3.id, state: 'used' }),
      ],
    );
  });

  it('should update a car in a fleet by Id', async () => {
    const data4 = {
      owner: 1,
      state: 'new',
      status: 'available',
      price: '39393939',
      manufacturer: 'a',
      model: 'a',
      body_type: 'a',
    };
    const result = await car.update(car1.id, data4);
    expect(result).toEqual(jasmine.objectContaining(
      [
        jasmine.objectContaining({ id: car1.id, state: 'new' }),
        jasmine.objectContaining({ id: car2.id, state: 'used' }),
      ],
    ));
  });
});
