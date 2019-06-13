"use strict";

var _supertest = _interopRequireDefault(require("supertest"));

var _index = _interopRequireDefault(require("../../index"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

describe('/api/v1/auth', function () {
  afterEach(
  /*#__PURE__*/
  _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee() {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _index["default"].close();

          case 2:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  })));
  describe('POST /signup', function () {
    var newUser;

    var exec =
    /*#__PURE__*/
    function () {
      var _ref2 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2() {
        var res;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return (0, _supertest["default"])(_index["default"]).post('/api/v1/auth/signup').send(newUser);

              case 2:
                res = _context2.sent;
                return _context2.abrupt("return", res);

              case 4:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      return function exec() {
        return _ref2.apply(this, arguments);
      };
    }();

    beforeEach(function () {
      newUser = {
        first_name: 'ineza',
        last_name: 'sandra',
        email: 'ineza.sandra@gmail.com',
        password: 'PassWord123@',
        address: 'kg120st'
      };
    });
    afterEach(
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee3() {
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              newUser = {};

            case 1:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    })));
    it('should return error message if user input validation fails',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee4() {
      var res;
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              newUser.email = 'dd';
              _context4.next = 3;
              return exec();

            case 3:
              res = _context4.sent;
              expect(res.status).toBe(400);

            case 5:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4);
    })));
    it('should return user details after successfull sign up',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee5() {
      var res;
      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.next = 2;
              return exec();

            case 2:
              res = _context5.sent;
              expect(res.status).toBe(200);

            case 4:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5);
    })));
    it('should return user already registered if user attemps to signup again',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee6() {
      var res;
      return regeneratorRuntime.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _context6.next = 2;
              return exec();

            case 2:
              _context6.next = 4;
              return exec();

            case 4:
              res = _context6.sent;
              expect(res.status).toBe(400);

            case 6:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6);
    })));
  });
  describe('POST /signin', function () {
    var user;

    var exec =
    /*#__PURE__*/
    function () {
      var _ref7 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee7() {
        var res;
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _context7.next = 2;
                return (0, _supertest["default"])(_index["default"]).post('/api/v1/auth/signin').send(user);

              case 2:
                res = _context7.sent;
                return _context7.abrupt("return", res);

              case 4:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7);
      }));

      return function exec() {
        return _ref7.apply(this, arguments);
      };
    }();

    beforeEach(function () {
      user = {
        email: 'ineza.sandra@gmail.com',
        password: 'PassWord123@'
      };
    });
    afterEach(function () {
      user = {};
    });
    it('should return error message if user input validation fails',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee8() {
      var res;
      return regeneratorRuntime.wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              user.email = 'dd';
              _context8.next = 3;
              return exec();

            case 3:
              res = _context8.sent;
              expect(res.status).toBe(400);

            case 5:
            case "end":
              return _context8.stop();
          }
        }
      }, _callee8);
    })));
    it('should return error message if user is not registered',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee9() {
      var res;
      return regeneratorRuntime.wrap(function _callee9$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              user.email = 'usernotknown@gmail.com';
              _context9.next = 3;
              return exec();

            case 3:
              res = _context9.sent;
              expect(res.status).toBe(400);

            case 5:
            case "end":
              return _context9.stop();
          }
        }
      }, _callee9);
    }))); // it('should return user details and token if user successfully signs in', async () => {
    //   const newUser = {
    //     first_name: 'ineza',
    //     last_name: 'sandra',
    //     email: 'ineza.sandra@gmail.com',
    //     password: 'password',
    //     address: 'kg120st',
    //   };
    //   const res = await request(server)
    //     .post('/api/v1/auth/signup')
    //     .send(newUser);
    //   const res = await exec();
    //   expect(res.status).toBe(200);
    // });
  });
});