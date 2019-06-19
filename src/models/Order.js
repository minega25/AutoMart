/* eslint-disable class-methods-use-this */
import moment from 'moment';
import uuid from 'uuid';
import Query from '../helpers/dbquery';

class Order {
  constructor() {
    this.orders = [];
  }

  // Add order
  async add(data) {
    // Query string
    const insertOrder = `INSERT INTO orders(id,buyer,car_id,price,price_offered,status,createddate,modifieddate) 
    VALUES($1,$2,$3,$4,$5,$6,$7,$8) returning *`;

    const order = {
      id: uuid.v4(),
      buyer: data.buyer || '',
      car_id: data.car_id || '',
      price: data.price || '',
      price_offered: data.amount || 0,
      status: data.status || '',
      createdDate: moment().format(),
      modifiedDate: moment().format(),
    };
    const orderArr = Object.keys(order).map(u => order[u]);
    const { rows } = await Query(insertOrder, orderArr);
    return rows[0];
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
