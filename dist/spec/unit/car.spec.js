"use strict";

var _Car = _interopRequireDefault(require("../../models/Car"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

describe('Car model', function () {
  var car;
  var car1;
  var car2;
  var car3;
  beforeEach(
  /*#__PURE__*/
  _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee() {
    var data1, data2, data3;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            car = new _Car["default"]();
            data1 = {
              state: 'used',
              status: 'sold',
              price: 1000000,
              manufacturer: 'a',
              model: 'a',
              body_type: 'a'
            };
            data2 = {
              state: 'used',
              status: 'available',
              price: 2000000,
              manufacturer: 'a',
              model: 'a',
              body_type: 'a'
            };
            data3 = {
              state: 'used',
              status: 'available',
              price: 3000000,
              manufacturer: 'a',
              model: 'a',
              body_type: 'a'
            };
            car1 = car.add(data1);
            car2 = car.add(data2);
            car3 = car.add(data3);

          case 7:
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
            car = {};

          case 1:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  })));
  it('should return a car with a given id', function () {
    var result = car.findById(car1.id);
    expect(result).toEqual(jasmine.objectContaining({
      id: car1.id,
      state: 'used'
    }));
  });
  it('should return all unsold cars', function () {
    var result = car.findUnsold();
    expect(result).toEqual(jasmine.objectContaining([jasmine.objectContaining({
      id: car2.id,
      status: 'available'
    }), jasmine.objectContaining({
      id: car3.id,
      status: 'available'
    })]));
  });
  it('should return all cars within the fleet', function () {
    var result = car.findAll();
    expect(result).toEqual(jasmine.objectContaining([jasmine.objectContaining({
      id: car1.id,
      state: 'used'
    }), jasmine.objectContaining({
      id: car2.id,
      state: 'used'
    })]));
  });
  it('should delete a car within the fleet by id', function () {
    var result = car["delete"](car1.id);
    expect(result).not.toEqual(jasmine.objectContaining([jasmine.objectContaining({
      id: car1.id,
      state: 'used'
    })]));
  });
  it('should return all cars within a min and max price range', function () {
    var min = 2000000;
    var max = 3000000;
    var result = car.findByPrice(min, max);
    expect(result).toEqual(jasmine.objectContaining([jasmine.objectContaining({
      id: car2.id,
      state: 'used'
    }), jasmine.objectContaining({
      id: car3.id,
      state: 'used'
    })]));
  });
  it('should add a car to a fleet',
  /*#__PURE__*/
  _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee3() {
    var data4, car4, allCars;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            data4 = {
              owner: 1,
              state: 'used',
              status: 'available',
              price: '39393939',
              manufacturer: 'a',
              model: 'a',
              body_type: 'a'
            };
            car4 = car.add(data4);
            allCars = car.findAll();
            expect(allCars).toEqual([jasmine.objectContaining({
              id: car1.id,
              state: 'used'
            }), jasmine.objectContaining({
              id: car2.id,
              state: 'used'
            }), jasmine.objectContaining({
              id: car3.id,
              state: 'used'
            }), jasmine.objectContaining({
              id: car4.id,
              state: 'used'
            })]);

          case 4:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  })));
  it('should update a car in a fleet by Id',
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
              owner: 1,
              state: 'new',
              status: 'available',
              price: 39393939,
              manufacturer: 'a',
              model: 'a',
              body_type: 'a'
            };
            _context4.next = 3;
            return car.update(car1.id, data4);

          case 3:
            result = _context4.sent;
            expect(result).toEqual(jasmine.objectContaining([jasmine.objectContaining({
              id: car1.id,
              state: 'new'
            }), jasmine.objectContaining({
              id: car2.id,
              state: 'used'
            })]));

          case 5:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  })));
});