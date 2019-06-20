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
  async findById(id) {
    const query = 'SELECT * FROM orders WHERE id=$1';
    const { rows } = await Query(query, [id]);
    return rows[0];
  }

  // Update a order
  async update(id, data) {
    const priceUpdate = 'UPDATE orders SET price_offered=$1,modifieddate=$2 WHERE id=$3';
    const response = await Query(priceUpdate, [data.new_price_offered, moment().format(), id]);

    return response;
  }
}

export default Order;
