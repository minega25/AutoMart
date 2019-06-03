import bodyParser from 'body-parser';
import users from '../routes/users';
import cars from '../routes/cars';


export default (app) => {
  app.use(bodyParser.json());
  app.use('/api/v1/auth', users);
  app.use('/api/v1/car', cars);
};
