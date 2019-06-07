"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _moment = _interopRequireDefault(require("moment"));

var _uuid = _interopRequireDefault(require("uuid"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Car =
/*#__PURE__*/
function () {
  function Car() {
    _classCallCheck(this, Car);

    this.cars = [];
  } // Add car in fleet


  _createClass(Car, [{
    key: "add",
    value: function add(data) {
      var car = {
        id: _uuid["default"].v4(),
        email: data.email || '',
        owner: data.owner || '',
        state: data.state || '',
        status: data.status || '',
        price: data.price || '',
        manufacturer: data.manufacturer || '',
        model: data.model || '',
        body_type: data.body_type || '',
        createdDate: (0, _moment["default"])(),
        modifiedDate: (0, _moment["default"])()
      };
      this.cars.push(car);
      return car;
    } // Find car by Id

  }, {
    key: "findById",
    value: function findById(id) {
      return this.cars.find(function (car) {
        return car.id === id;
      });
    } // Find all cars

  }, {
    key: "findAll",
    value: function findAll() {
      return this.cars;
    } // Find all unsold cars

  }, {
    key: "findUnsold",
    value: function findUnsold() {
      return this.cars.filter(function (car) {
        return car.status === 'available';
      });
    } // Find all unsold cars in a fleet within a price range

  }, {
    key: "findByPrice",
    value: function findByPrice(min, max) {
      return this.cars.filter(function (car) {
        return car.status === 'available' && car.price > min && car.price < max;
      });
    } // Update car

  }, {
    key: "update",
    value: function update(id, data) {
      var car = this.findById(id);
      var index = this.cars.indexOf(car);
      this.cars[index].state = data.state || car.state;
      this.cars[index].status = data.status || car.status;
      this.cars[index].price = data.price || car.price;
      this.cars[index].modifiedDate = _moment["default"].now();
      return this.cars;
    } // Delete car by id

  }, {
    key: "delete",
    value: function _delete(id) {
      var car = this.findById(id);
      var index = this.cars.indexOf(car);
      this.cars.splice(index, 1);
      return this.cars;
    }
  }]);

  return Car;
}();

var _default = Car;
exports["default"] = _default;