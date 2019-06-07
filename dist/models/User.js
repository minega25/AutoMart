"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _moment = _interopRequireDefault(require("moment"));

var _uuid = _interopRequireDefault(require("uuid"));

var _bcrypt = _interopRequireDefault(require("bcrypt"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var User =
/*#__PURE__*/
function () {
  function User() {
    _classCallCheck(this, User);

    this.users = [];
  } // Add user


  _createClass(User, [{
    key: "add",
    value: function () {
      var _add = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(data) {
        var salt, hash, user;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                salt = _bcrypt["default"].genSaltSync(10);
                hash = _bcrypt["default"].hashSync(data.password, salt);
                user = {
                  id: _uuid["default"].v4(),
                  email: data.email || '',
                  first_name: data.first_name || '',
                  last_name: data.last_name || '',
                  password: hash || '',
                  address: data.address || '',
                  is_admin: !!data.is_admin,
                  createdDate: _moment["default"].now(),
                  modifiedDate: _moment["default"].now()
                };
                this.users.push(user);
                return _context.abrupt("return", user);

              case 5:
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
    }() // Find user by Id

  }, {
    key: "findById",
    value: function findById(id) {
      return this.users.find(function (user) {
        return user.id === id;
      });
    } // Find user by any attribute

  }, {
    key: "findOne",
    value: function findOne(data) {
      var attrArr = Object.keys(data);
      var attr = attrArr[0];
      return this.users.find(function (user) {
        return user[attr] === data[attr];
      });
    } // Find all users

  }, {
    key: "findAll",
    value: function findAll() {
      return this.users;
    } // Update a user

  }, {
    key: "update",
    value: function () {
      var _update = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(id, data) {
        var salt, hash, user, index;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                salt = _bcrypt["default"].genSaltSync(10);
                hash = _bcrypt["default"].hashSync(data.password, salt);
                user = this.findById(id);
                index = this.users.indexOf(user);
                this.users[index].password = hash || user.password;
                this.users[index].modifiedDate = _moment["default"].now();
                return _context2.abrupt("return", this.users);

              case 7:
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
    }() // Delete user by id

  }, {
    key: "delete",
    value: function _delete(id) {
      var user = this.findById(id);
      var index = this.users.indexOf(user);
      this.users.splice(index, 1);
      return this.users;
    }
  }]);

  return User;
}();

var _default = User;
exports["default"] = _default;