"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _RequestError = _interopRequireDefault(require("./RequestError"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = function _default(data, statusCode, message) {
  if (data === undefined) {
    throw new _RequestError["default"](statusCode, message);
  }
};

exports["default"] = _default;