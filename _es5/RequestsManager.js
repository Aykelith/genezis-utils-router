"use strict";

require("core-js/modules/es.array.for-each");

require("core-js/modules/es.function.bind");

require("core-js/modules/es.object.define-property");

require("core-js/modules/web.dom-collections.for-each");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _expressAsyncHandler = _interopRequireDefault(require("express-async-handler"));

var _express = _interopRequireDefault(require("express"));

var _RouteTypes = require("./data/RouteTypes");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var RequestManager =
/*#__PURE__*/
function () {
  function RequestManager(app) {
    _classCallCheck(this, RequestManager);

    if (!app) throw new Error();
    this.app = app;
    this.addRoute = this.addRoute.bind(this);
    this.addGroupRoutes = this.addGroupRoutes.bind(this);
    this.use = this.use.bind(this);
  }

  _createClass(RequestManager, [{
    key: "addRoute",
    value: function addRoute(requestType, path, requestFunc, router) {
      (router || this.app)[(0, _RouteTypes.createRouteFunction)(requestType)](path, (0, _expressAsyncHandler["default"])(requestFunc));
    }
  }, {
    key: "addGroupRoutes",
    value: function addGroupRoutes(mainPath, routes) {
      var _this = this;

      console.log(mainPath);

      var router = _express["default"].Router();

      routes.forEach(function (data) {
        return _this.addRoute(data.requestType, data.path, data.requestFunc, router);
      });
      this.app.use(mainPath, router);
    }
  }, {
    key: "use",
    value: function use(f) {
      this.app.use(f);
    }
  }]);

  return RequestManager;
}();

exports["default"] = RequestManager;
;