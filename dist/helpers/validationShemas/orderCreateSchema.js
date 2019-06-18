"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _joi = _interopRequireDefault(require("@hapi/joi"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var schema = {
  car_id: _joi["default"].string().trim().required(),
  amount: _joi["default"].number().required(),
  status: _joi["default"].string().trim().min(1).max(7).required()
};
var _default = schema;
exports["default"] = _default;