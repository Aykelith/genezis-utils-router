"use strict";

require("core-js/modules/es.array.for-each");

require("core-js/modules/web.dom-collections.for-each");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _Checker = _interopRequireDefault(require("@genezis/genezis/Checker"));

var _deleteOnProduction = _interopRequireDefault(require("@genezis/genezis/utils/deleteOnProduction"));

var _RequestsManager = _interopRequireDefault(require("./RequestsManager"));

var _createRouteErrorHandle = _interopRequireDefault(require("./createRouteErrorHandle"));

var _createRouteStructure = require("./createRouteStructure");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var GenezisCheckerConfig = (0, _deleteOnProduction["default"])({
  routes: _Checker["default"].array({
    of: _Checker["default"].or([_Checker["default"].object({
      shape: {
        mainPath: _Checker["default"].string().required(),
        routesData: _Checker["default"].array({
          of: _createRouteStructure.GenezisChecker
        }).required()
      }
    }), _createRouteStructure.GenezisChecker])
  }).required(),
  routeErrorHandler: _Checker["default"]["function"]()
});

var _default = function _default(settings) {
  (0, _Checker["default"])(settings, GenezisCheckerConfig);
  var routeErrorHandle = settings.routeErrorHandler || (0, _createRouteErrorHandle["default"])({
    logger: _LOGGER_FACTORY.createLogger("router")
  });
  return function (app) {
    var requestManager = new _RequestsManager["default"](app);
    settings.routes.forEach(function (routeData) {
      if (routeData.mainPath) {
        requestManager.addGroupRoutes(routeData.mainPath, routeData.routesData);
      } else {
        requestManager.addRoute(routeData.requestType, routeData.path, routeData.requestFunc);
      }
    });
    requestManager.use(routeErrorHandle);
    return requestManager;
  };
};

exports["default"] = _default;