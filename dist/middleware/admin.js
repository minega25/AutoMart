"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

// eslint-disable-next-line consistent-return
var admin = function admin(req, res, next) {
  if (!req.user.isAdmin) return res.status(403).send({
    status: 403,
    data: 'Unathorized access.'
  });
  next();
};

var _default = admin;
exports["default"] = _default;