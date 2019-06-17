import winston from 'winston';
import express from 'express';
import config from 'config';

import logging from './startup/logging';
import cors from './startup/cors';
import routes from './startup/routes';
import conf from './startup/config';
import db from './startup/db';

const app = express();

logging();
cors(app);
routes(app);
conf();
db();

const port = process.env.PORT || config.get('port');
const server = app.listen(port, () => winston.info(`Listening on port ${port}...`));

export default server;
