"use strict";

require("core-js/modules/es.object.values");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createRouteFunction = createRouteFunction;
exports.RouteTypesValues = exports["default"] = void 0;
var RouteTypes = {
  GET: 0,
  POST: 1,
  ALL: 9
};
var _default = RouteTypes;
exports["default"] = _default;
var RouteTypesValues = Object.values(RouteTypes);
exports.RouteTypesValues = RouteTypesValues;

function createRouteFunction(routeType) {
  switch (routeType) {
    case RouteTypes.GET:
      return "get";

    case RouteTypes.POST:
      return "post";

    case RouteTypes.ALL:
      return "all";

    default:
      throw new Error();
  }
}