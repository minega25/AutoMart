const bodyParser = require('body-parser');
const users = require('../routes/users');
// const auth = require('../routes/auth');

module.exports = (app) => {
  app.use(bodyParser.json());
  app.use('/api/v1/auth', users);
};
