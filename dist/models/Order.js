"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _moment = _interopRequireDefault(require("moment"));

var _uuid = _interopRequireDefault(require("uuid"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Order =
/*#__PURE__*/
function () {
  function Order() {
    _classCallCheck(this, Order);

    this.orders = [];
  } // Add order


  _createClass(Order, [{
    key: "add",
    value: function () {
      var _add = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(data) {
        var order;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                order = {
                  id: _uuid["default"].v4(),
                  buyer: data.buyer || '',
                  car_id: data.car_id || '',
                  price: data.price || '',
                  price_offered: data.amount || '',
                  status: data.status || '',
                  created_on: (0, _moment["default"])(),
                  modifiedDate: (0, _moment["default"])()
                };
                this.orders.push(order);
                return _context.abrupt("return", order);

              case 3:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function add(_x) {
        return _add.apply(this, arguments);
      }

      return add;
    }() // Find order by Id

  }, {
    key: "findById",
    value: function findById(id) {
      return this.orders.find(function (order) {
        return order.id === id;
      });
    } // Find all orders

  }, {
    key: "findAll",
    value: function findAll() {
      return this.orders;
    } // Update a order

  }, {
    key: "update",
    value: function () {
      var _update = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(id, data) {
        var order, index;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                order = this.findById(id);
                index = this.orders.indexOf(order);
                this.orders[index].amount = data.amount || order.amount;
                this.orders[index].modifiedDate = _moment["default"].now();
                return _context2.abrupt("return", this.orders);

              case 5:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function update(_x2, _x3) {
        return _update.apply(this, arguments);
      }

      return update;
    }() // Delete order by id

  }, {
    key: "delete",
    value: function _delete(id) {
      var order = this.findById(id);
      var index = this.orders.indexOf(order);
      this.orders.splice(index, 1);
      return this.orders;
    }
  }]);

  return Order;
}();

var _default = Order;
exports["default"] = _default;