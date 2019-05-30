const winston = require('winston');
require('express-async-errors');

module.exports = () => {
  winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { service: 'user-service' },
    transports: [
      new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
      new winston.transports.File({ filename: 'logs/combined.log' }),
    ],
    exceptionHandlers: [
      new winston.transports.File({ filename: 'logs/exceptions.log' }),
    ],
  });

  if (process.env.NODE_ENV !== 'production') {
    winston.add(new winston.transports.Console({
      format: winston.format.simple(),
    }));
  }
};
// eslint-disable-next-line func-names
// module.exports = function () {
//   winston.handleExceptions(
//     new winston.transports.Console({ colorize: true, prettyPrint: true }),
//     new winston.transports.File({ filename: 'uncaughtExceptions.log' }),
//   );

//   process.on('unhandledRejection', (ex) => {
//     throw ex;
//   });

//   winston.add(winston.transports.File, { filename: 'logfile.log' });
// };
