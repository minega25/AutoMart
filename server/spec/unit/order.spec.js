/* eslint-disable max-len */
const Order = require('../../models/Order');

describe('Order model', () => {
  let order;
  let order1;
  let order2;
  beforeEach(async () => {
    order = new Order();
    const data1 = {
      buyer: 'a',
      car_id: 'asdfd',
      amount: 'sdfd',
      status: 'sdf',
    };
    const data2 = {
      buyer: 'b',
      car_id: 'asdfd',
      amount: 'sdfd',
      status: 'sdf',
    };
    order1 = await order.add(data1);
    order2 = await order.add(data2);
  });
  afterEach(async () => {
    order = {};
  });
  it('should return a order with a given id', () => {
    const result = order.findById(order1.id);
    expect(result).toEqual(jasmine.objectContaining({ id: order1.id }));
  });

  it('should return all registered orders ', () => {
    const result = order.findAll();
    // eslint-disable-next-line max-len
    expect(result).toEqual(jasmine.objectContaining([jasmine.objectContaining({ id: order1.id }), jasmine.objectContaining({ id: order2.id })]));
  });

  it('should delete a order by id', () => {
    const result = order.delete(order1.id);
    expect(result).not.toEqual(jasmine.objectContaining([jasmine.objectContaining({ id: order1.id })]));
  });

  it('should add a order', async () => {
    const data3 = {
      buyer: 'c',
      car_id: 'asdfd',
      amount: 'sdfd',
      status: 'sdf',
    };
    const order3 = await order.add(data3);
    const allorders = order.findAll();
    expect(allorders).toEqual(
      [
        jasmine.objectContaining({ id: order1.id }),
        jasmine.objectContaining({ id: order2.id }),
        jasmine.objectContaining({ id: order3.id }),
      ],
    );
  });

  it('should update a order by Id', async () => {
    const data4 = {
      buyer: 'd',
      car_id: 'asdfd',
      amount: 'sdfd',
      status: 'sdf',
    };
    const result = await order.update(order1.id, data4);
    expect(result).toEqual(jasmine.objectContaining(
      [
        jasmine.objectContaining({ id: order1.id }),
        jasmine.objectContaining({ id: order2.id }),
      ],
    ));
  });
});
