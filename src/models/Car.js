/* eslint-disable class-methods-use-this */
/* eslint-disable no-else-return */
import moment from 'moment';
import uuid from 'uuid';
import Query from '../helpers/dbquery';

class Car {
  constructor() {
    this.cars = [];
  }

  // Add car in fleet
  async add(data) {
    // Query string
    const insertCar = `INSERT INTO cars(id,owner,email,state,status,price,manufacturer,model,body_type,createddate,modifieddate) 
    VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11) returning *`;

    const car = {
      id: uuid.v4(),
      owner: data.owner || '',
      email: data.email || '',
      state: data.state || '',
      status: data.status || 'available',
      price: data.price || '',
      manufacturer: data.manufacturer || '',
      model: data.model || '',
      body_type: data.body_type || '',
      createdDate: moment().format(),
      modifiedDate: moment().format(),
    };
    const carArr = Object.keys(car).map(u => car[u]);
    const { rows } = await Query(insertCar, carArr);
    return rows[0];
  }

  // Find car by Id
  findById(id) {
    return this.cars.find(car => car.id === id);
  }

  findByMin(min) {
    const minPrice = parseInt(min, 10);
    const result = this.cars.filter((car) => {
      if (car.status === 'available') {
        if ((car.price >= minPrice)) {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    });
    return result;
  }

  findByMax(max) {
    const maxPrice = parseInt(max, 10);
    const result = this.cars.filter((car) => {
      if (car.status === 'available') {
        if ((car.price <= maxPrice)) {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    });
    return result;
  }

  findByState(state) {
    const result = this.cars.filter((car) => {
      if (car.status === 'available') {
        if ((car.state === state)) {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    });
    return result;
  }

  // Find all cars
  findAll() {
    return this.cars;
  }

  // Find all unsold cars
  findUnsold() {
    const result = this.cars.filter(car => car.status === 'available');
    return result;
  }

  // Find all unsold cars in a fleet within a price range
  findByPrice(min, max) {
    const minPrice = parseInt(min, 10);
    const maxPrice = parseInt(max, 10);
    const result = this.cars.filter((car) => {
      if (car.status === 'available') {
        if ((car.price >= minPrice) && (car.price <= maxPrice)) {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    });
    return result;
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
