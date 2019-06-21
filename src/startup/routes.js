import swaggerUi from 'swagger-ui-express';
import bodyParser from 'body-parser';
import swaggerDocument from '../routes/swagger.json';
import users from '../routes/users';
import cars from '../routes/cars';
import orders from '../routes/orders';
import flags from '../routes/flag';
import error from '../middleware/error';
import notfound from '../middleware/404';


export default (app) => {
  app.use(bodyParser.json());
  app.use('/api/v1/auth', users);
  app.use('/api/v1/car', cars);
  app.use('/api/v1/order', orders);
  app.use('/api/v1/flag', flags);
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  app.use(notfound);
  app.use(error);
};
