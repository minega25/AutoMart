import moment from 'moment';
import uuid from 'uuid';

class Order {
  constructor() {
    this.orders = [];
  }

  // Add order
  async add(data) {
    const order = {
      id: uuid.v4(),
      buyer: data.buyer || '',
      car_id: data.car_id || '',
      price: data.price || '',
      price_offered: data.amount || '',
      status: data.status || '',
      created_on: moment(),
      modifiedDate: moment(),
    };
    this.orders.push(order);
    return order;
  }

  // Find order by Id
  findById(id) {
    return this.orders.find(order => order.id === id);
  }

  // Find all orders
  findAll() {
    return this.orders;
  }

  // Update a order
  async update(id, data) {
    const order = this.findById(id);
    const index = this.orders.indexOf(order);
    this.orders[index].amount = data.amount || order.amount;
    this.orders[index].modifiedDate = moment.now();

    return this.orders;
  }

  // Delete order by id
  delete(id) {
    const order = this.findById(id);
    const index = this.orders.indexOf(order);
    this.orders.splice(index, 1);

    return this.orders;
  }
}

export default Order;
