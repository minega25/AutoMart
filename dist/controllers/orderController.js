"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateOrderPrice = exports.orderCreatePost = void 0;

var _joi = _interopRequireDefault(require("@hapi/joi"));

var _lodash = _interopRequireDefault(require("lodash"));

var _Order = _interopRequireDefault(require("../models/Order"));

var _orderCreateSchema = _interopRequireDefault(require("../helpers/validationShemas/orderCreateSchema"));

var _carController = require("./carController");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var orders = new _Order["default"](); // Handle car create on POST.

var orderCreatePost =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(req, res) {
    var newOrder, _Joi$validate, error, _response, carObject, _response2, addedOrder, response;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            newOrder = _lodash["default"].pick(req.body, ['buyer', 'car_id', 'status', 'amount']);
            _Joi$validate = _joi["default"].validate(newOrder, _orderCreateSchema["default"]), error = _Joi$validate.error;

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
            carObject = _carController.car.findById(newOrder.car_id);

            if (carObject) {
              _context.next = 9;
              break;
            }

            _response2 = {
              status: 400,
              error: 'Car with that id does not exist'
            };
            return _context.abrupt("return", res.status(400).json(_response2));

          case 9:
            newOrder.price = carObject.price;
            _context.next = 12;
            return orders.add(newOrder);

          case 12:
            addedOrder = _context.sent;
            response = {
              status: 200,
              data: _lodash["default"].pick(addedOrder, ['id', 'car_id', 'status', 'price', 'price_offered', 'created_on'])
            };
            return _context.abrupt("return", res.status(200).json(response));

          case 15:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function orderCreatePost(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.orderCreatePost = orderCreatePost;

var updateOrderPrice =
/*#__PURE__*/
function () {
  var _ref2 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(req, res) {
    var orderId, _Joi$validate2, error, _response3, order, _response4, _response5, response;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            // Validate incoming user input
            orderId = req.params.order_id;
            _Joi$validate2 = _joi["default"].validate(orderId, _joi["default"].string().guid({
              version: 'uuidv4'
            })), error = _Joi$validate2.error;

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
            //  Find order
            order = orders.findById(orderId);

            if (order) {
              _context2.next = 9;
              break;
            }

            _response4 = {
              status: 400,
              error: 'Order does not exist'
            };
            return _context2.abrupt("return", res.status(400).json(_response4));

          case 9:
            if (!(order.status !== 'pending')) {
              _context2.next = 12;
              break;
            }

            _response5 = {
              status: 400,
              error: 'Order status changed to non pending.'
            };
            return _context2.abrupt("return", res.status(400).json(_response5));

          case 12:
            // Update price
            order.old_price_offered = order.price_offered;
            order.new_price_offered = req.body.new_price_offered;
            response = {
              status: 200,
              data: _lodash["default"].pick(order, ['id', 'car_id', 'status', 'old_price_offered', 'new_price_offered'])
            };
            return _context2.abrupt("return", res.status(200).json(response));

          case 16:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function updateOrderPrice(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.updateOrderPrice = updateOrderPrice;