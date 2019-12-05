"use strict";

require("core-js/modules/es.array.concat");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _Checker = _interopRequireDefault(require("@genezis/genezis/Checker"));

var _deleteOnProduction = _interopRequireDefault(require("@genezis/genezis/utils/deleteOnProduction"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

//= Functions & Modules
var GenezisCheckerConfig = (0, _deleteOnProduction["default"])({
  extraRequestData: _Checker["default"]["function"]()
});

var _default = function _default(settings) {
  (0, _Checker["default"])(settings, GenezisCheckerConfig);

  if (process.env.NODE_ENV === "production") {
    return function () {
      return function () {};
    };
  }

  return function () {
    var head = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "HEAD_IS_NOT_SETTED";
    return function (req, data) {
      return console.debug("".concat(head).concat(settings.extraRequestData ? settings.extraRequestData(req, data) : "", "Entered with data:\"").concat(JSON.stringify(data), "\""));
    };
  };
};

exports["default"] = _default;