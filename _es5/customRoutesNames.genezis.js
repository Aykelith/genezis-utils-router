"use strict";

require("core-js/modules/es.object.assign");

require("core-js/modules/es.object.keys");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _Checker = _interopRequireDefault(require("@genezis/genezis/Checker"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = {
  genezisConfig: {
    routesNames: _Checker["default"].object()
  },
  getRoutesNames: function getRoutesNames(config, DefaultRoutesNames) {
    var OriginalRoutesNamesKeys = Object.keys(DefaultRoutesNames);

    if (config.routesNames) {
      config.routesNames = Object.assign({}, DefaultRoutesNames, config.routesNames); // Check if the custom route names not contains wrong values

      var UserRoutesNamesKeys = Object.keys(config.routesNames);
      if (OriginalRoutesNamesKeys.length != UserRoutesNamesKeys.length) throw new Error();
    } else {
      config.routesNames = DefaultRoutesNames;
    }
  }
};
exports["default"] = _default;