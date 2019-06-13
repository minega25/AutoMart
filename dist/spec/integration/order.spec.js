"use strict";

var _supertest = _interopRequireDefault(require("supertest"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _config = _interopRequireDefault(require("config"));

var _uuid = _interopRequireDefault(require("uuid"));

var _index = _interopRequireDefault(require("../../index"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

describe('/api/v1/order', function () {
  var tempCar;
  var tempOrder;
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
    var newOrder;
    var userToken;
    var newCar = {
      owner: 'minega shyaka patrick',
      state: 'used',
      status: 'available',
      price: 123456,
      manufacturer: 'toyota',
      model: 'RAV 4',
      body_type: 'Jeep'
    };

    var registerCar =
    /*#__PURE__*/
    function () {
      var _ref2 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(token, car) {
        var response;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return (0, _supertest["default"])(_index["default"]).post('/api/v1/car').set('x-auth-token', token || '').send(car);

              case 2:
                response = _context2.sent;
                return _context2.abrupt("return", response);

              case 4:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      return function registerCar(_x, _x2) {
        return _ref2.apply(this, arguments);
      };
    }();

    var exec =
    /*#__PURE__*/
    function () {
      var _ref3 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3(token) {
        var res;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return (0, _supertest["default"])(_index["default"]).post('/api/v1/order').set('x-auth-token', token || '').send(newOrder);

              case 2:
                res = _context3.sent;
                return _context3.abrupt("return", res);

              case 4:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));

      return function exec(_x3) {
        return _ref3.apply(this, arguments);
      };
    }();

    beforeEach(
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee4() {
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              userToken = _jsonwebtoken["default"].sign({
                id: _uuid["default"].v4(),
                email: 'minega.patrick@gmail.com',
                isAdmin: false
              }, _config["default"].get('jwtPrivateKey'));
              newOrder = {
                buyer: 'patrick',
                car_id: 'f5a4535d-8241-4f0f-9c05-9608c405f0cb',
                status: 'pending',
                amount: 20000000
              };

            case 2:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4);
    })));
    it('should return error message if user input validation fails',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee5() {
      var res;
      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              newOrder.buyer = '';
              _context5.next = 3;
              return exec(userToken);

            case 3:
              res = _context5.sent;
              expect(res.status).toBe(400);

            case 5:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5);
    })));
    it('should return error message if user not authenticated',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee6() {
      var res;
      return regeneratorRuntime.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              userToken = '';
              _context6.next = 3;
              return exec(userToken);

            case 3:
              res = _context6.sent;
              expect(res.status).toBe(401);

            case 5:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6);
    })));
    it('should return error if ordered car does not exist',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee7() {
      var res;
      return regeneratorRuntime.wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              newOrder.car_id = '175ce5c2-f678-4c13-88a0-3f54e67aa05e';
              _context7.next = 3;
              return exec(userToken);

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
    it('should return order details if order submission is successfull',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee8() {
      return regeneratorRuntime.wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              _context8.next = 2;
              return registerCar(userToken, newCar);

            case 2:
              tempCar = _context8.sent;
              newOrder.car_id = tempCar.body.data.id;
              _context8.next = 6;
              return exec(userToken);

            case 6:
              tempOrder = _context8.sent;
              expect(tempOrder.status).toBe(200);

            case 8:
            case "end":
              return _context8.stop();
          }
        }
      }, _callee8);
    })));
  });
  describe('PATCH /<:order-id>/price', function () {
    var userToken;
    var price_offered = {
      new_price_offered: 1000000
    };

    var exec =
    /*#__PURE__*/
    function () {
      var _ref9 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee9(token, orderId) {
        var res;
        return regeneratorRuntime.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                _context9.next = 2;
                return (0, _supertest["default"])(_index["default"]).patch("/api/v1/order/".concat(orderId, "/price")).set('Accept', 'application/json').set('x-auth-token', token || '').send(price_offered);

              case 2:
                res = _context9.sent;
                return _context9.abrupt("return", res);

              case 4:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9);
      }));

      return function exec(_x4, _x5) {
        return _ref9.apply(this, arguments);
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
    regeneratorRuntime.mark(function _callee10() {
      var badId, res;
      return regeneratorRuntime.wrap(function _callee10$(_context10) {
        while (1) {
          switch (_context10.prev = _context10.next) {
            case 0:
              badId = 'ssss';
              _context10.next = 3;
              return exec(userToken, badId);

            case 3:
              res = _context10.sent;
              expect(res.status).toBe(400);

            case 5:
            case "end":
              return _context10.stop();
          }
        }
      }, _callee10);
    })));
    it('should return error 400 message if order does not exist',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee11() {
      var WrongId, res;
      return regeneratorRuntime.wrap(function _callee11$(_context11) {
        while (1) {
          switch (_context11.prev = _context11.next) {
            case 0:
              WrongId = '853d913f-4fc0-4aeb-825c-b3ba82c9dcd9';
              _context11.next = 3;
              return exec(userToken, WrongId);

            case 3:
              res = _context11.sent;
              expect(res.status).toBe(400);

            case 5:
            case "end":
              return _context11.stop();
          }
        }
      }, _callee11);
    })));
    it('should return error message if user not authenticated',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee12() {
      var res;
      return regeneratorRuntime.wrap(function _callee12$(_context12) {
        while (1) {
          switch (_context12.prev = _context12.next) {
            case 0:
              userToken = '';
              _context12.next = 3;
              return exec(userToken, tempOrder.body.data.id);

            case 3:
              res = _context12.sent;
              expect(res.status).toBe(401);

            case 5:
            case "end":
              return _context12.stop();
          }
        }
      }, _callee12);
    }))); // it('should return error message if status of order is not pending', async () => {
    //   tempOrder.body.data.status = 'completed';
    //   const res = await exec(userToken, tempOrder.body.data.id);
    //   expect(res.status).toBe(400);
    // });

    it('should return order details after successful order price offer updated',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee13() {
      var res;
      return regeneratorRuntime.wrap(function _callee13$(_context13) {
        while (1) {
          switch (_context13.prev = _context13.next) {
            case 0:
              _context13.next = 2;
              return exec(userToken, tempOrder.body.data.id);

            case 2:
              res = _context13.sent;
              expect(res.status).toBe(200);

            case 4:
            case "end":
              return _context13.stop();
          }
        }
      }, _callee13);
    })));
  });
});