"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _userController = require("../controllers/userController");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router(); // POST request to create user


router.post('/signup', _userController.userCreatePost); // POST request to sign in user

router.post('/signin', _userController.userLoginPost);
var _default = router;
exports["default"] = _default;