"use strict";

var _uuid = _interopRequireDefault(require("uuid"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _config = _interopRequireDefault(require("config"));

var _nodeMocksHttp = _interopRequireDefault(require("node-mocks-http"));

var _auth = _interopRequireDefault(require("../../../middleware/auth"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

describe('auth middleware', function () {
  it('should populate req.user with the payload of a valid JWT', function () {
    var user = {
      _id: _uuid["default"].v4(),
      isAdmin: true
    };

    var token = _jsonwebtoken["default"].sign(user, _config["default"].get('jwtPrivateKey'));

    var req = _nodeMocksHttp["default"].createRequest({
      method: 'GET',
      url: '/api/v1/auth',
      headers: {
        'x-auth-token': token
      }
    });

    var res = _nodeMocksHttp["default"].createResponse();

    var next = {};
    (0, _auth["default"])(req, res, next);
    expect(req.user).toEqual(jasmine.objectContaining(user));
  });
});