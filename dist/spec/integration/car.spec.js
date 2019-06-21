"use strict";

var _supertest = _interopRequireDefault(require("supertest"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _config = _interopRequireDefault(require("config"));

var _uuid = _interopRequireDefault(require("uuid"));

var _index = _interopRequireDefault(require("../../index"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

describe('/api/v1/car', function () {
  var tempCar;
  afterAll(
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
  describe('POST /', function () {
    var newCar;
    var userToken;

    var exec =
    /*#__PURE__*/
    function () {
      var _ref2 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(token) {
        var res;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return (0, _supertest["default"])(_index["default"]).post('/api/v1/car').set('x-auth-token', token || '').send(newCar);

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

      return function exec(_x) {
        return _ref2.apply(this, arguments);
      };
    }();

    beforeEach(function () {
      userToken = _jsonwebtoken["default"].sign({
        id: _uuid["default"].v4(),
        email: 'minega.patrick@gmail.com',
        isAdmin: false
      }, _config["default"].get('jwtPrivateKey'));
      newCar = {
        owner: 'minega shyaka patrick',
        state: 'used',
        status: 'available',
        price: 123456,
        manufacturer: 'toyota',
        model: 'RAV 4',
        body_type: 'Jeep'
      };
    });
    it('should return error message if user input validation fails',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee3() {
      var res;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              newCar.state = '';
              _context3.next = 3;
              return exec(userToken);

            case 3:
              res = _context3.sent;
              expect(res.status).toBe(400);

            case 5:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    })));
    it('should return error message if user not authenticated',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee4() {
      var res;
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              userToken = '';
              _context4.next = 3;
              return exec(userToken);

            case 3:
              res = _context4.sent;
              expect(res.status).toBe(401);

            case 5:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4);
    })));
    it('should return car details after successfull car registration',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee5() {
      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.next = 2;
              return exec(userToken);

            case 2:
              tempCar = _context5.sent;
              expect(tempCar.status).toBe(200);

            case 4:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5);
    })));
  });
  describe('PATCH /<:car-id>/status', function () {
    var userToken;

    var exec =
    /*#__PURE__*/
    function () {
      var _ref6 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee6(token, carId) {
        var res;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.next = 2;
                return (0, _supertest["default"])(_index["default"]).patch("/api/v1/car/".concat(carId, "/status")).set('x-auth-token', token || '');

              case 2:
                res = _context6.sent;
                return _context6.abrupt("return", res);

              case 4:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6);
      }));

      return function exec(_x2, _x3) {
        return _ref6.apply(this, arguments);
      };
    }();

    beforeEach(function () {
      userToken = _jsonwebtoken["default"].sign({
        id: _uuid["default"].v4(),
        email: 'minega.patrick@gmail.com',
        isAdmin: false
      }, _config["default"].get('jwtPrivateKey'));
    });
    it('should return error message if car_id is not a valid id',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee7() {
      var badId, res;
      return regeneratorRuntime.wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              badId = 'ssss';
              _context7.next = 3;
              return exec(userToken, badId);

            case 3:
              res = _context7.sent;
              expect(res.status).toBe(400);

            case 5:
            case "end":
              return _context7.stop();
          }
        }
      }, _callee7);
    })));
    it('should return error message if car does not exist',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee8() {
      var badId, res;
      return regeneratorRuntime.wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              badId = 'fcc10a6f-da1d-41a5-ae18-81b815a98d19';
              _context8.next = 3;
              return exec(userToken, badId);

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
    it('should return error message if user not authenticated',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee9() {
      var res;
      return regeneratorRuntime.wrap(function _callee9$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              userToken = '';
              _context9.next = 3;
              return exec(userToken);

            case 3:
              res = _context9.sent;
              expect(res.status).toBe(401);

            case 5:
            case "end":
              return _context9.stop();
          }
        }
      }, _callee9);
    })));
    it('should return car details after successfull car status update',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee10() {
      var res;
      return regeneratorRuntime.wrap(function _callee10$(_context10) {
        while (1) {
          switch (_context10.prev = _context10.next) {
            case 0:
              _context10.next = 2;
              return exec(userToken, tempCar.body.data.id);

            case 2:
              res = _context10.sent;
              expect(res.status).toBe(200);

            case 4:
            case "end":
              return _context10.stop();
          }
        }
      }, _callee10);
    })));
  });
  describe('GET /<:car-id>', function () {
    var userToken;
    var newCar;

    var exec =
    /*#__PURE__*/
    function () {
      var _ref11 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee11(token, carId) {
        var res;
        return regeneratorRuntime.wrap(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                _context11.next = 2;
                return (0, _supertest["default"])(_index["default"]).get("/api/v1/car/".concat(carId)).set('x-auth-token', token || '');

              case 2:
                res = _context11.sent;
                return _context11.abrupt("return", res);

              case 4:
              case "end":
                return _context11.stop();
            }
          }
        }, _callee11);
      }));

      return function exec(_x4, _x5) {
        return _ref11.apply(this, arguments);
      };
    }();

    beforeEach(function () {
      userToken = _jsonwebtoken["default"].sign({
        id: _uuid["default"].v4(),
        email: 'minega.patrick@gmail.com',
        isAdmin: false
      }, _config["default"].get('jwtPrivateKey'));
      newCar = {
        id: '28dc2cc2-672f-4673-bcf1-14e4dfc609cd',
        email: '',
        state: 'used',
        status: 'available',
        price: 2000000,
        manufacturer: 'a',
        model: 'a',
        body_type: 'a',
        createdDate: 'Thu Jun 13 2019 12:53:07 GMT+0200',
        modifiedDate: 'Thu Jun 13 2019 12:53:07 GMT+0200'
      };
    });
    afterEach(function () {});
    it('should return error message if car_id is not a valid id',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee12() {
      var res;
      return regeneratorRuntime.wrap(function _callee12$(_context12) {
        while (1) {
          switch (_context12.prev = _context12.next) {
            case 0:
              newCar.id = 'ssss';
              _context12.next = 3;
              return exec(userToken, newCar.id);

            case 3:
              res = _context12.sent;
              expect(res.status).toBe(400);

            case 5:
            case "end":
              return _context12.stop();
          }
        }
      }, _callee12);
    })));
  });
  describe('PATCH /<:car-id>/price', function () {
    var userToken;
    var newPrice = {
      price: 70000000
    };

    var exec =
    /*#__PURE__*/
    function () {
      var _ref13 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee13(token, carId) {
        var res;
        return regeneratorRuntime.wrap(function _callee13$(_context13) {
          while (1) {
            switch (_context13.prev = _context13.next) {
              case 0:
                _context13.next = 2;
                return (0, _supertest["default"])(_index["default"]).patch("/api/v1/car/".concat(carId, "/price")).set('x-auth-token', token || '').send(newPrice);

              case 2:
                res = _context13.sent;
                return _context13.abrupt("return", res);

              case 4:
              case "end":
                return _context13.stop();
            }
          }
        }, _callee13);
      }));

      return function exec(_x6, _x7) {
        return _ref13.apply(this, arguments);
      };
    }();

    beforeEach(function () {
      userToken = _jsonwebtoken["default"].sign({
        id: _uuid["default"].v4(),
        email: 'minega.patrick@gmail.com',
        isAdmin: false
      }, _config["default"].get('jwtPrivateKey'));
    });
    it('should return error message if car_id is not a valid id',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee14() {
      var badId, res;
      return regeneratorRuntime.wrap(function _callee14$(_context14) {
        while (1) {
          switch (_context14.prev = _context14.next) {
            case 0:
              badId = 'ssss';
              _context14.next = 3;
              return exec(userToken, badId);

            case 3:
              res = _context14.sent;
              expect(res.status).toBe(400);

            case 5:
            case "end":
              return _context14.stop();
          }
        }
      }, _callee14);
    })));
    it('should return error message if car does not exist',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee15() {
      var badId, res;
      return regeneratorRuntime.wrap(function _callee15$(_context15) {
        while (1) {
          switch (_context15.prev = _context15.next) {
            case 0:
              badId = 'fcc10a6f-da1d-41a5-ae18-81b815a98d19';
              _context15.next = 3;
              return exec(userToken, badId);

            case 3:
              res = _context15.sent;
              expect(res.status).toBe(400);

            case 5:
            case "end":
              return _context15.stop();
          }
        }
      }, _callee15);
    })));
    it('should return error message if user not authenticated',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee16() {
      var res;
      return regeneratorRuntime.wrap(function _callee16$(_context16) {
        while (1) {
          switch (_context16.prev = _context16.next) {
            case 0:
              userToken = '';
              _context16.next = 3;
              return exec(userToken);

            case 3:
              res = _context16.sent;
              expect(res.status).toBe(401);

            case 5:
            case "end":
              return _context16.stop();
          }
        }
      }, _callee16);
    })));
    it('should return car details after successfull car status update',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee17() {
      var res;
      return regeneratorRuntime.wrap(function _callee17$(_context17) {
        while (1) {
          switch (_context17.prev = _context17.next) {
            case 0:
              _context17.next = 2;
              return exec(userToken, tempCar.body.data.id);

            case 2:
              res = _context17.sent;
              expect(res.status).toBe(200);

            case 4:
            case "end":
              return _context17.stop();
          }
        }
      }, _callee17);
    })));
  });
  describe('DELETE /<:car-id>', function () {
    var userToken;
    var adminToken;

    var exec =
    /*#__PURE__*/
    function () {
      var _ref18 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee18(token, carId) {
        var res;
        return regeneratorRuntime.wrap(function _callee18$(_context18) {
          while (1) {
            switch (_context18.prev = _context18.next) {
              case 0:
                _context18.next = 2;
                return (0, _supertest["default"])(_index["default"])["delete"]("/api/v1/car/".concat(carId)).set('x-auth-token', token || '');

              case 2:
                res = _context18.sent;
                return _context18.abrupt("return", res);

              case 4:
              case "end":
                return _context18.stop();
            }
          }
        }, _callee18);
      }));

      return function exec(_x8, _x9) {
        return _ref18.apply(this, arguments);
      };
    }();

    beforeEach(function () {
      userToken = _jsonwebtoken["default"].sign({
        id: _uuid["default"].v4(),
        email: 'minega.patrick@gmail.com',
        isAdmin: false
      }, _config["default"].get('jwtPrivateKey'));
      adminToken = _jsonwebtoken["default"].sign({
        id: _uuid["default"].v4(),
        email: 'admin@gmail.com',
        isAdmin: true
      }, _config["default"].get('jwtPrivateKey'));
    });
    it('should return error message if car_id is not a valid id',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee19() {
      var badId, res;
      return regeneratorRuntime.wrap(function _callee19$(_context19) {
        while (1) {
          switch (_context19.prev = _context19.next) {
            case 0:
              badId = 'ssss';
              _context19.next = 3;
              return exec(userToken, badId);

            case 3:
              res = _context19.sent;
              expect(res.status).toBe(400);

            case 5:
            case "end":
              return _context19.stop();
          }
        }
      }, _callee19);
    })));
    it('should return error message if car does not exist',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee20() {
      var badId, res;
      return regeneratorRuntime.wrap(function _callee20$(_context20) {
        while (1) {
          switch (_context20.prev = _context20.next) {
            case 0:
              badId = 'fcc10a6f-da1d-41a5-ae18-81b815a98d19';
              _context20.next = 3;
              return exec(userToken, badId);

            case 3:
              res = _context20.sent;
              expect(res.status).toBe(400);

            case 5:
            case "end":
              return _context20.stop();
          }
        }
      }, _callee20);
    })));
    it('should return error message if user not authenticated',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee21() {
      var res;
      return regeneratorRuntime.wrap(function _callee21$(_context21) {
        while (1) {
          switch (_context21.prev = _context21.next) {
            case 0:
              userToken = '';
              _context21.next = 3;
              return exec(userToken);

            case 3:
              res = _context21.sent;
              expect(res.status).toBe(401);

            case 5:
            case "end":
              return _context21.stop();
          }
        }
      }, _callee21);
    })));
    it('should return car deleted successfully if user is admin update',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee22() {
      var res;
      return regeneratorRuntime.wrap(function _callee22$(_context22) {
        while (1) {
          switch (_context22.prev = _context22.next) {
            case 0:
              _context22.next = 2;
              return exec(adminToken, tempCar.body.data.id);

            case 2:
              res = _context22.sent;
              expect(res.status).toBe(200);

            case 4:
            case "end":
              return _context22.stop();
          }
        }
      }, _callee22);
    })));
  });
});