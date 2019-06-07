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
  describe('POST /', function () {
    var newOrder;
    var userToken; // const newCar = {
    //   owner: 'minega shyaka patrick',
    //   state: 'used',
    //   status: 'available',
    //   price: 123456,
    //   manufacturer: 'toyota',
    //   model: 'RAV 4',
    //   body_type: 'Jeep',
    // };
    // const registerCar = async (token) => {
    //   const res = await request(server)
    //     .post('/api/v1/car')
    //     .set('x-auth-token', token || '')
    //     .send(newCar);
    //   return res;
    // };

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
                return (0, _supertest["default"])(_index["default"]).post('/api/v1/order').set('x-auth-token', token || '').send(newOrder);

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

    beforeEach(
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee3() {
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              // const car = await registerCar(userToken);
              // console.log(car.body.data.id);
              userToken = _jsonwebtoken["default"].sign({
                id: _uuid["default"].v4(),
                email: 'minega.patrick@gmail.com',
                isAdmin: false
              }, _config["default"].get('jwtPrivateKey'));
              newOrder = {
                buyer: 'minega shyaka',
                car_id: '175ce5c2-f678-4c13-88a0-3f54e67aa05d',
                status: 'pending',
                amount: '2,000,000'
              };

            case 2:
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
              newOrder.owner = '';
              _context4.next = 3;
              return exec(userToken);

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
    it('should return error message if user not authenticated',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee5() {
      var res;
      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              userToken = '';
              _context5.next = 3;
              return exec(userToken);

            case 3:
              res = _context5.sent;
              expect(res.status).toBe(401);

            case 5:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5);
    })));
    it('should return error if ordered car does not exist',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee6() {
      var res;
      return regeneratorRuntime.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              newOrder.car_id = '175ce5c2-f678-4c13-88a0-3f54e67aa05e';
              _context6.next = 3;
              return exec(userToken);

            case 3:
              res = _context6.sent;
              expect(res.status).toBe(400);

            case 5:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6);
    }))); // it('should return order details if order submission is successfull', async () => {
    //   const res = await exec(userToken);
    //   expect(res.status).toBe(200);
    // });
  });
});