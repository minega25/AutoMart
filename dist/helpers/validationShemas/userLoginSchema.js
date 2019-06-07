"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _joi = _interopRequireDefault(require("@hapi/joi"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var schema = {
  email: _joi["default"].string().email().min(5).max(255).required(),
  password: _joi["default"].string().min(5).max(255).required()
};
var _default = schema;
exports["default"] = _default;