"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _joi = _interopRequireDefault(require("@hapi/joi"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var schema = {
  owner: _joi["default"].string().min(5).max(255).required(),
  state: _joi["default"].string().min(3).max(7).required(),
  status: _joi["default"].string().min(3).max(10).required(),
  price: _joi["default"].number().required(),
  manufacturer: _joi["default"].string().min(3).max(255).required(),
  model: _joi["default"].string().min(3).max(255).required(),
  body_type: _joi["default"].string().min(3).max(255).required()
};
var _default = schema;
exports["default"] = _default;