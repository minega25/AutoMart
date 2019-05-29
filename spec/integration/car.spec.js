// const Car = require('../../models/Car');
// const request = require('../../index');

// let server;
// let car;

// describe('/api/v1/cars', () => {
//   // eslint-disable-next-line global-require
//   beforeEach(() => { server = require('../../index'); });
//   afterEach(async () => {
//     await server.close();
//     await Car.remove({});
//   });

//   describe('GET /', () => {
//     it('', async () => {
//       car = new Car();
//       const data1 = {
//         owner: 1,
//         state: 'used',
//         status: 'available',
//         price: '39393939',
//         manufacturer: 'a',
//         model: 'a',
//         body_type: 'a',
//       };
//       const data2 = {
//         owner: 1,
//         state: 'used',
//         status: 'available',
//         price: '39393939',
//         manufacturer: 'a',
//         model: 'a',
//         body_type: 'a',
//       };
//       const car1 = await car.add(data1);
//       const car2 = await car.add(data2);
//       const res = await request(server).get('/api/v1/orders');

//       expect(res.status).toBe(200);
//       expect(res.body.length).toBe(2);
//       expect(res.body.some(c => c.id === car1.id)).toBeTruthy();
//       expect(res.body.some(c => c.name === car2.id)).toBeTruthy();
//     });
//   });
// });
