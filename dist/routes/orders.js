"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _orderController = require("../controllers/orderController");

var _auth = _interopRequireDefault(require("../middleware/auth"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router(); // POST request to create car


router.post('/', _auth["default"], _orderController.orderCreatePost);
router.patch('/:order_id/price', _auth["default"], _orderController.updateOrderPrice);
var _default = router;
exports["default"] = _default;