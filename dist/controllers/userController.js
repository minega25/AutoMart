"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.userLoginPost = exports.userCreatePost = void 0;

var _joi = _interopRequireDefault(require("@hapi/joi"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _config = _interopRequireDefault(require("config"));

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _lodash = _interopRequireDefault(require("lodash"));

var _User = _interopRequireDefault(require("../models/User"));

var _userSignUpSchema = _interopRequireDefault(require("../helpers/validationShemas/userSignUpSchema"));

var _userLoginSchema = _interopRequireDefault(require("../helpers/validationShemas/userLoginSchema"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var users = new _User["default"](); // Handle user create on POST.

var userCreatePost =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(req, res) {
    var newUser, _Joi$validate, error, _response, userExistsAlready, _response2, addedUser, userToken, response;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            newUser = _lodash["default"].pick(req.body, ['first_name', 'last_name', 'password', 'email', 'address', 'is_admin']);
            _Joi$validate = _joi["default"].validate(newUser, _userSignUpSchema["default"]), error = _Joi$validate.error;

            if (!error) {
              _context.next = 5;
              break;
            }

            _response = {
              status: 400,
              error: error.details[0].message
            };
            return _context.abrupt("return", res.status(400).json(_response));

          case 5:
            userExistsAlready = users.findAll().find(function (user) {
              return user.email === newUser.email;
            });

            if (!userExistsAlready) {
              _context.next = 9;
              break;
            }

            _response2 = {
              status: 400,
              error: 'User already exists'
            };
            return _context.abrupt("return", res.status(400).json(_response2));

          case 9:
            _context.next = 11;
            return users.add(newUser);

          case 11:
            addedUser = _context.sent;
            userToken = _jsonwebtoken["default"].sign({
              id: addedUser.id,
              email: addedUser.email,
              isAdmin: addedUser.is_admin
            }, _config["default"].get('jwtPrivateKey'));
            response = {
              status: 200,
              data: {
                token: userToken,
                id: addedUser.id,
                first_name: addedUser.first_name,
                last_name: addedUser.last_name,
                email: addedUser.email,
                is_admin: addedUser.is_admin
              }
            };
            return _context.abrupt("return", res.header('x-auth-token', userToken).status(200).json(response));

          case 15:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function userCreatePost(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.userCreatePost = userCreatePost;

var userLoginPost =
/*#__PURE__*/
function () {
  var _ref2 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(req, res) {
    var user, _Joi$validate2, error, _response3, userRegistered, _response4, validPassword, _response5, userToken, response;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            user = _lodash["default"].pick(req.body, ['email', 'password']);
            _Joi$validate2 = _joi["default"].validate(user, _userLoginSchema["default"]), error = _Joi$validate2.error;

            if (!error) {
              _context2.next = 5;
              break;
            }

            _response3 = {
              status: 400,
              error: error.details[0].message
            };
            return _context2.abrupt("return", res.status(400).json(_response3));

          case 5:
            userRegistered = users.findAll().find(function (u) {
              return u.email === user.email;
            });

            if (userRegistered) {
              _context2.next = 9;
              break;
            }

            _response4 = {
              status: 400,
              error: 'Invalid email or password provided'
            };
            return _context2.abrupt("return", res.status(400).json(_response4));

          case 9:
            _context2.next = 11;
            return _bcrypt["default"].compare(req.body.password, userRegistered.password);

          case 11:
            validPassword = _context2.sent;

            if (validPassword) {
              _context2.next = 15;
              break;
            }

            _response5 = {
              status: 400,
              error: 'Invalid email or password provided'
            };
            return _context2.abrupt("return", res.status(400).json(_response5));

          case 15:
            userToken = _jsonwebtoken["default"].sign({
              id: userRegistered.id,
              email: userRegistered.email,
              isAdmin: userRegistered.is_admin
            }, _config["default"].get('jwtPrivateKey'));
            response = {
              status: 200,
              data: {
                token: userToken,
                id: userRegistered.id,
                first_name: userRegistered.first_name,
                last_name: userRegistered.last_name,
                email: userRegistered.email
              }
            };
            return _context2.abrupt("return", res.header('x-auth-token', userToken).status(200).json(response));

          case 18:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function userLoginPost(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.userLoginPost = userLoginPost;