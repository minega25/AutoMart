"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _winston = _interopRequireDefault(require("winston"));

require("express-async-errors");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = function _default() {
  _winston["default"].createLogger({
    level: 'info',
    format: _winston["default"].format.json(),
    defaultMeta: {
      service: 'user-service'
    },
    transports: [new _winston["default"].transports.File({
      filename: 'logs/error.log',
      level: 'error'
    }), new _winston["default"].transports.File({
      filename: 'logs/combined.log'
    })],
    exceptionHandlers: [new _winston["default"].transports.File({
      filename: 'logs/exceptions.log'
    })]
  });

  if (process.env.NODE_ENV !== 'production') {
    _winston["default"].add(new _winston["default"].transports.Console({
      format: _winston["default"].format.simple()
    }));
  }
};

exports["default"] = _default;