"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GenezisChecker = exports["default"] = void 0;

var _Checker = _interopRequireDefault(require("@genezis/genezis/Checker"));

var _RouteTypes = require("./data/RouteTypes");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = function _default(requestType, path, requestFunc) {
  return {
    requestType: requestType,
    path: path,
    requestFunc: requestFunc
  };
};

exports["default"] = _default;

var GenezisChecker = _Checker["default"].object({
  shape: {
    requestType: _Checker["default"].required().integer().oneOf(_RouteTypes.RouteTypesValues),
    path: _Checker["default"].required().string(),
    requestFunc: _Checker["default"].required()["function"]()
  }
});

exports.GenezisChecker = GenezisChecker;