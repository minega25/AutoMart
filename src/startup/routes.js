import bodyParser from 'body-parser';
import users from '../routes/users';


export default (app) => {
  app.use(bodyParser.json());
  app.use('/api/v1/auth', users);
};
