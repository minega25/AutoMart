// import swaggerUi from 'swagger-ui-express';
import bodyParser from 'body-parser';
import users from '../routes/users';
import cars from '../routes/cars';
import orders from '../routes/orders';


export default (app) => {
  app.use(bodyParser.json());
  app.use('/api/v1/auth', users);
  app.use('/api/v1/car', cars);
  app.use('/api/v1/order', orders);
  // app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
};
