"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _users = _interopRequireDefault(require("../routes/users"));

var _cars = _interopRequireDefault(require("../routes/cars"));

var _orders = _interopRequireDefault(require("../routes/orders"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// import swaggerUi from 'swagger-ui-express';
// import swaggerDocument from '../routes/swagger.json';
var _default = function _default(app) {
  app.use(_bodyParser["default"].json());
  app.use('/api/v1/auth', _users["default"]);
  app.use('/api/v1/car', _cars["default"]);
  app.use('/api/v1/order', _orders["default"]); // app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
};

exports["default"] = _default;