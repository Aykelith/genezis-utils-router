"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _Checker = _interopRequireDefault(require("@genezis/genezis/Checker"));

var _RequestError = _interopRequireDefault(require("./RequestError"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = function _default(settings) {
  (0, _Checker["default"])(settings, {
    logger: _Checker["default"].required().object()
  });
  return function (error, req, res, next) {
    if (error instanceof _RequestError["default"]) {
      var status = error.statusCode || 400;
      var message = error.message;
      res.status(status).json({
        message: message
      });

      if (status != 500) {
        return;
      }
    }

    console.error("Error on \"".concat(req.url, "\":"), error);
    settings.logger.error(error, {
      url: req.url,
      "user-agent": req.headers["user-agent"],
      ip: req.headers["x-real-ip"]
    });
    res.status(500).end();
  };
};

exports["default"] = _default;