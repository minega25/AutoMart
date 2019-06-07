"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _joi = _interopRequireDefault(require("@hapi/joi"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var schema = {
  price: _joi["default"].number().required(),
  carId: _joi["default"].string().guid({
    version: 'uuidv4'
  })
};
var _default = schema;
exports["default"] = _default;