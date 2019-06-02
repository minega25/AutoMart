import moment from 'moment';
import uuid from 'uuid';

class Car {
  constructor() {
    this.cars = [];
  }

  // Add car in fleet
  add(data) {
    const car = {
      id: uuid.v4(),
      owner: data.owner || '',
      state: data.state || '',
      status: data.status || '',
      price: data.price || '',
      manufacturer: data.manufacturer || '',
      model: data.model || '',
      body_type: data.body_type || '',
      createdDate: moment.now(),
      modifiedDate: moment.now(),
    };
    this.cars.push(car);
    return car;
  }

  // Find car by Id
  findById(id) {
    return this.cars.find(car => car.id === id);
  }

  // Find all cars
  findAll() {
    return this.cars;
  }

  // Update car
  update(id, data) {
    const car = this.findById(id);
    const index = this.cars.indexOf(car);
    this.cars[index].state = data.state || car.state;
    this.cars[index].status = data.status || car.status;
    this.cars[index].price = data.price || car.price;
    this.cars[index].modifiedDate = moment.now();

    return this.cars;
  }

  // Delete car by id
  delete(id) {
    const car = this.findById(id);
    const index = this.cars.indexOf(car);
    this.cars.splice(index, 1);
    return this.cars;
  }
}

export default Car;
