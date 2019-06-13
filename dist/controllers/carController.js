"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.car = exports.deleteCar = exports.getCars = exports.getCar = exports.updateCarPrice = exports.updateCarStatus = exports.carCreatePost = void 0;

var _joi = _interopRequireDefault(require("@hapi/joi"));

var _lodash = _interopRequireDefault(require("lodash"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _config = _interopRequireDefault(require("config"));

var _Car = _interopRequireDefault(require("../models/Car"));

var _carCreateSchema = _interopRequireDefault(require("../helpers/validationShemas/carCreateSchema"));

var _updateCarPriceSchema = _interopRequireDefault(require("../helpers/validationShemas/updateCarPriceSchema"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var cars = new _Car["default"](); // Handle car create on POST.

var carCreatePost =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(req, res) {
    var newCar, _Joi$validate, error, _response, addedCar, response;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            newCar = _lodash["default"].pick(req.body, ['state', 'price', 'manufacturer', 'model', 'body_type']);
            _Joi$validate = _joi["default"].validate(newCar, _carCreateSchema["default"]), error = _Joi$validate.error;

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
            newCar.owner = req.user.id;
            newCar.email = req.user.email;
            _context.next = 9;
            return cars.add(newCar);

          case 9:
            addedCar = _context.sent;
            response = {
              status: 200,
              data: _lodash["default"].pick(addedCar, ['id', 'email', 'state', 'status', 'price', 'createdDate', 'manufacturer'])
            };
            return _context.abrupt("return", res.status(200).json(response));

          case 12:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function carCreatePost(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.carCreatePost = carCreatePost;

var updateCarStatus = function updateCarStatus(req, res) {
  // Validate incoming user input
  var carId = req.params.car_id;

  var _Joi$validate2 = _joi["default"].validate(carId, _joi["default"].string().guid({
    version: 'uuidv4'
  })),
      error = _Joi$validate2.error;

  if (error) {
    var _response2 = {
      status: 400,
      error: error.details[0].message
    };
    return res.status(400).json(_response2);
  } //  Find car


  var car = cars.findById(carId);

  if (!car) {
    var _response3 = {
      status: 400,
      error: 'Car does not exist'
    };
    return res.status(400).json(_response3);
  } // Update car


  if (car.status === 'available') {
    car.status = 'sold';
  } else {
    car.status = 'available';
  }

  var response = {
    status: 200,
    data: _lodash["default"].pick(car, ['id', 'email', 'created_on', 'manufacturer', 'model', 'price', 'state', 'status'])
  };
  return res.status(200).json(response);
};

exports.updateCarStatus = updateCarStatus;

var updateCarPrice = function updateCarPrice(req, res) {
  // Validate incoming user input
  var carId = req.params.car_id;
  var price = req.body.price;

  var _Joi$validate3 = _joi["default"].validate({
    price: price,
    carId: carId
  }, _updateCarPriceSchema["default"]),
      error = _Joi$validate3.error;

  if (error) {
    var _response4 = {
      status: 400,
      error: error.details[0].message
    };
    return res.status(400).json(_response4);
  } //  Find car


  var car = cars.findById(carId);

  if (!car) {
    var _response5 = {
      status: 400,
      error: 'Car does not exist'
    };
    return res.status(400).json(_response5);
  } // Update price


  car.price = price;
  var response = {
    status: 200,
    data: _lodash["default"].pick(car, ['id', 'email', 'state', 'status', 'price', 'createdDate', 'model', 'manufacturer'])
  };
  return res.status(200).json(response);
};

exports.updateCarPrice = updateCarPrice;

var getCar = function getCar(req, res) {
  // Validate incoming user input
  var carId = req.params.car_id;

  var _Joi$validate4 = _joi["default"].validate(carId, _joi["default"].string().guid({
    version: 'uuidv4'
  })),
      error = _Joi$validate4.error;

  if (error) {
    var _response6 = {
      status: 400,
      error: error.details[0].message
    };
    return res.status(400).json(_response6);
  } //  Find car


  var car = cars.findById(carId);

  if (!car) {
    var _response7 = {
      status: 400,
      error: 'Car does not exist'
    };
    return res.status(400).json(_response7);
  } // return car details to client


  var response = {
    status: 200,
    data: _lodash["default"].pick(car, ['id', 'email', 'state', 'status', 'price', 'createdDate', 'manufacturer', 'model', 'body_type'])
  };
  return res.status(200).json(response);
};

exports.getCar = getCar;

var getCars = function getCars(req, res) {
  if (req.query) {
    if (req.query.status === 'available') {
      if (req.query.min_price && req.query.max_price) {
        var _req$query = req.query,
            min_price = _req$query.min_price,
            max_price = _req$query.max_price;
        var min = Math.min(min_price, max_price);
        var max = Math.max(min_price, max_price);
        var result = cars.findByPrice(min, max); // return car details to client

        var _response8 = {
          status: 200,
          data: _lodash["default"].map(result, _lodash["default"].partialRight(_lodash["default"].pick, ['id', 'email', 'state', 'status', 'price', 'createdDate', 'manufacturer', 'model', 'body_type']))
        };
        return res.status(200).json(_response8);
      }

      if (req.query.min_price) {
        var _result = cars.findByMin(req.query.min_price); // return car details to client


        var _response9 = {
          status: 200,
          data: _lodash["default"].map(_result, _lodash["default"].partialRight(_lodash["default"].pick, ['id', 'email', 'state', 'status', 'price', 'createdDate', 'manufacturer', 'model', 'body_type']))
        };
        return res.status(200).json(_response9);
      }

      if (req.query.max_price) {
        var _result2 = cars.findByMax(req.query.max_price); // return car details to client


        var _response10 = {
          status: 200,
          data: _lodash["default"].map(_result2, _lodash["default"].partialRight(_lodash["default"].pick, ['id', 'email', 'state', 'status', 'price', 'createdDate', 'manufacturer', 'model', 'body_type']))
        };
        return res.status(200).json(_response10);
      }

      var allUnsoldCars = cars.findUnsold(); // return car details to client

      var response = {
        status: 200,
        data: _lodash["default"].map(allUnsoldCars, _lodash["default"].partialRight(_lodash["default"].pick, ['id', 'email', 'state', 'status', 'price', 'createdDate', 'manufacturer', 'model', 'body_type']))
      };
      return res.status(200).json(response);
    }
  }

  var token = req.header('x-auth-token');

  if (token) {
    try {
      var decoded = _jsonwebtoken["default"].verify(token, _config["default"].get('jwtPrivateKey'));

      if (!decoded.isAdmin) {
        return res.status(403).send({
          status: 403,
          data: 'Unathorized access.'
        }); // eslint-disable-next-line no-else-return
      } else {
        var allCars = cars.findAll(); // return car details to client

        var _response11 = {
          status: 200,
          data: _lodash["default"].map(allCars, _lodash["default"].partialRight(_lodash["default"].pick, ['id', 'email', 'state', 'status', 'price', 'createdDate', 'manufacturer', 'model', 'body_type']))
        };
        return res.status(200).json(_response11);
      }
    } catch (ex) {
      return res.status(400).send('Invalid token.');
    }
  } else {
    return res.status(400).send({
      status: 400,
      data: 'No token provided'
    });
  }
};

exports.getCars = getCars;

var deleteCar = function deleteCar(req, res) {
  // Validate incoming user input
  var carId = req.params.car_id;

  var _Joi$validate5 = _joi["default"].validate(carId, _joi["default"].string().guid({
    version: 'uuidv4'
  })),
      error = _Joi$validate5.error;

  if (error) {
    var _response12 = {
      status: 400,
      error: error.details[0].message
    };
    return res.status(400).json(_response12);
  } //  Find car


  var car = cars.findById(carId);

  if (!car) {
    var _response13 = {
      status: 400,
      error: 'Car does not exist'
    };
    return res.status(400).json(_response13);
  }

  if (!req.user.isAdmin) {
    if (req.user.id === car.owner) {
      // delete car
      cars["delete"](carId);
      var _response14 = {
        status: 200,
        data: 'Car Ad successfully deleted'
      };
      return res.status(200).json(_response14);
    }

    return res.status(403).send({
      status: 403,
      data: 'Unathorized access.'
    });
  } // delete car


  cars["delete"](carId);
  var response = {
    status: 200,
    data: 'Car Ad successfully deleted'
  };
  return res.status(200).json(response);
};

exports.deleteCar = deleteCar;
var car = cars;
exports.car = car;