"use strict";

var _Order = _interopRequireDefault(require("../../models/Order"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

describe('Order model', function () {
  var order;
  var order1;
  var order2;
  beforeEach(
  /*#__PURE__*/
  _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee() {
    var data1, data2;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            order = new _Order["default"]();
            data1 = {
              buyer: 'a',
              car_id: 'asdfd',
              amount: 'sdfd',
              status: 'sdf'
            };
            data2 = {
              buyer: 'b',
              car_id: 'asdfd',
              amount: 'sdfd',
              status: 'sdf'
            };
            _context.next = 5;
            return order.add(data1);

          case 5:
            order1 = _context.sent;
            _context.next = 8;
            return order.add(data2);

          case 8:
            order2 = _context.sent;

          case 9:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  })));
  afterEach(
  /*#__PURE__*/
  _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2() {
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            order = {};

          case 1:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  })));
  it('should return a order with a given id', function () {
    var result = order.findById(order1.id);
    expect(result).toEqual(jasmine.objectContaining({
      id: order1.id
    }));
  });
  it('should return all registered orders ', function () {
    var result = order.findAll(); // eslint-disable-next-line max-len

    expect(result).toEqual(jasmine.objectContaining([jasmine.objectContaining({
      id: order1.id
    }), jasmine.objectContaining({
      id: order2.id
    })]));
  });
  it('should delete a order by id', function () {
    var result = order["delete"](order1.id);
    expect(result).not.toEqual(jasmine.objectContaining([jasmine.objectContaining({
      id: order1.id
    })]));
  });
  it('should add a order',
  /*#__PURE__*/
  _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee3() {
    var data3, order3, allorders;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            data3 = {
              buyer: 'c',
              car_id: 'asdfd',
              amount: 'sdfd',
              status: 'sdf'
            };
            _context3.next = 3;
            return order.add(data3);

          case 3:
            order3 = _context3.sent;
            allorders = order.findAll();
            expect(allorders).toEqual([jasmine.objectContaining({
              id: order1.id
            }), jasmine.objectContaining({
              id: order2.id
            }), jasmine.objectContaining({
              id: order3.id
            })]);

          case 6:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  })));
  it('should update a order by Id',
  /*#__PURE__*/
  _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee4() {
    var data4, result;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            data4 = {
              buyer: 'd',
              car_id: 'asdfd',
              amount: 'sdfd',
              status: 'sdf'
            };
            _context4.next = 3;
            return order.update(order1.id, data4);

          case 3:
            result = _context4.sent;
            expect(result).toEqual(jasmine.objectContaining([jasmine.objectContaining({
              id: order1.id
            }), jasmine.objectContaining({
              id: order2.id
            })]));

          case 5:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  })));
});