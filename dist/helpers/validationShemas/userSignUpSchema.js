"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _joi = _interopRequireDefault(require("@hapi/joi"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var schema = {
  first_name: _joi["default"].string().min(5).max(255).required(),
  last_name: _joi["default"].string().min(5).max(255).required(),
  email: _joi["default"].string().email().min(5).max(255).required(),
  password: _joi["default"].string().min(5).max(255).required(),
  address: _joi["default"].string().min(5).max(255).required(),
  is_admin: _joi["default"]["boolean"]()
};
var _default = schema;
exports["default"] = _default;