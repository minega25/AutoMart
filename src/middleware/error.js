const winston = require('winston');

export default function (err, req, res, next) {
  winston.error(err.message, err);
  res.status(500).send({ status: 500, error: 'Something failed.' });
}
