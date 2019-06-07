"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _winston = _interopRequireDefault(require("winston"));

var _express = _interopRequireDefault(require("express"));

var _config = _interopRequireDefault(require("config"));

var _expressOasGenerator = _interopRequireDefault(require("express-oas-generator"));

var _logging = _interopRequireDefault(require("./startup/logging"));

var _cors = _interopRequireDefault(require("./startup/cors"));

var _routes = _interopRequireDefault(require("./startup/routes"));

var _config2 = _interopRequireDefault(require("./startup/config"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var app = (0, _express["default"])();
(0, _logging["default"])();
(0, _cors["default"])(app);
(0, _routes["default"])(app);
(0, _config2["default"])();

_expressOasGenerator["default"].init(app, {});

var port = process.env.PORT || _config["default"].get('port');

var server = app.listen(port, function () {
  return _winston["default"].info("Listening on port ".concat(port, "..."));
});
var _default = server;
exports["default"] = _default;