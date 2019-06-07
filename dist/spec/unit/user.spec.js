"use strict";

var _User = _interopRequireDefault(require("../../models/User"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

describe('User model', function () {
  var user;
  var user1;
  var user2;
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
            user = new _User["default"]();
            data1 = {
              email: 'abc@gmail.com',
              first_name: 'minega',
              last_name: 'kevin',
              password: '12345',
              address: 'abc',
              is_admin: true
            };
            data2 = {
              email: 'deg@gmail.com',
              first_name: 'abc',
              last_name: 'deg',
              password: '12345',
              address: 'deg'
            };
            _context.next = 5;
            return user.add(data1);

          case 5:
            user1 = _context.sent;
            _context.next = 8;
            return user.add(data2);

          case 8:
            user2 = _context.sent;

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
            user = {};

          case 1:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  })));
  it('should return a user with a given id', function () {
    var result = user.findById(user1.id);
    expect(result).toEqual(jasmine.objectContaining({
      id: user1.id,
      is_admin: true
    }));
  });
  it('should return a user based on any attribute', function () {
    var result = user.findOne({
      email: 'deg@gmail.com'
    });
    expect(result).toEqual(jasmine.objectContaining({
      email: 'deg@gmail.com'
    }));
  });
  it('should return all registered users ', function () {
    var result = user.findAll(); // eslint-disable-next-line max-len

    expect(result).toEqual(jasmine.objectContaining([jasmine.objectContaining({
      id: user1.id,
      is_admin: true
    }), jasmine.objectContaining({
      id: user2.id,
      is_admin: false
    })]));
  });
  it('should delete a user by id', function () {
    var result = user["delete"](user1.id);
    expect(result).not.toEqual(jasmine.objectContaining([jasmine.objectContaining({
      id: user1.id,
      is_admin: true
    })]));
  });
  it('should add a user',
  /*#__PURE__*/
  _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee3() {
    var data3, user3, allusers;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            data3 = {
              email: 'deg@gmail.com',
              first_name: 'abc',
              last_name: 'deg',
              password: '12345',
              address: 'deg'
            };
            _context3.next = 3;
            return user.add(data3);

          case 3:
            user3 = _context3.sent;
            allusers = user.findAll();
            expect(allusers).toEqual([jasmine.objectContaining({
              id: user1.id,
              is_admin: true
            }), jasmine.objectContaining({
              id: user2.id,
              is_admin: false
            }), jasmine.objectContaining({
              id: user3.id,
              is_admin: false
            })]);

          case 6:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  })));
  it('should update a user by Id',
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
              email: 'deg@gmail.com',
              first_name: 'abc',
              last_name: 'deg',
              password: 'abcde',
              address: 'deg'
            };
            _context4.next = 3;
            return user.update(user1.id, data4);

          case 3:
            result = _context4.sent;
            expect(result).toEqual(jasmine.objectContaining([jasmine.objectContaining({
              id: user1.id,
              is_admin: true
            }), jasmine.objectContaining({
              id: user2.id,
              is_admin: false
            })]));

          case 5:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  })));
});