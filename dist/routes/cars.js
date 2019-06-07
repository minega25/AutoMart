"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var carController = _interopRequireWildcard(require("../controllers/carController"));

var _auth = _interopRequireDefault(require("../middleware/auth"));

var _admin = _interopRequireDefault(require("../middleware/admin"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router(); // POST request to create car


router.post('/', _auth["default"], carController.carCreatePost);
router.patch('/:car_id/status', _auth["default"], carController.updateCarStatus);
router.patch('/:car_id/price', _auth["default"], carController.updateCarPrice);
router.get('/:car_id', carController.getCar);
router.get('/', carController.getCars);
router["delete"]('/:car_id', [_auth["default"], _admin["default"]], carController.deleteCar);
var _default = router;
exports["default"] = _default;