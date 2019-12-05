"use strict";

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.promise");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GenezisRulesConfig = exports["default"] = void 0;

require("regenerator-runtime/runtime");

var _Checker = _interopRequireDefault(require("@genezis/genezis/Checker"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function getRequestData(req) {
  return req.method == "GET" ? req.query : req.body;
}

var _default = function _default() {
  var settings = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var f = arguments.length > 1 ? arguments[1] : undefined;
  return function _callee(req, res, next) {
    var sharedData, onSuccess, data, i, length;
    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            sharedData = {};

            onSuccess = function onSuccess(response) {
              var callNext = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
              var resMethod = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "json";
              var resEndType = arguments.length > 3 ? arguments[3] : undefined;

              if (callNext) {
                next();
                return;
              }

              if (resEndType) res[resMethod](response, resEndType);else res[resMethod](response);
            };

            data = getRequestData(req);

            if (!settings.onBegin) {
              _context.next = 11;
              break;
            }

            i = 0, length = settings.onBegin.length;

          case 5:
            if (!(i < length)) {
              _context.next = 11;
              break;
            }

            _context.next = 8;
            return regeneratorRuntime.awrap(settings.onBegin[i](req, data, sharedData));

          case 8:
            ++i;
            _context.next = 5;
            break;

          case 11:
            _context.prev = 11;
            _context.next = 14;
            return regeneratorRuntime.awrap(f(req, data, onSuccess, sharedData));

          case 14:
            _context.next = 19;
            break;

          case 16:
            _context.prev = 16;
            _context.t0 = _context["catch"](11);
            throw _context.t0;

          case 19:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[11, 16]]);
  };
};
/**
 * @name GenezisRulesConfigParams
 * 
 * @param {RequestFunction[]} onBegin an array of RequestFunction functions that are called in the beggining of the request
 */

/**
 * 
 */


exports["default"] = _default;
var GenezisRulesConfig = {
  onBegin: _Checker["default"].array({
    of: _Checker["default"]["function"]({// `arguments: [
      //     _GenezisConfig.FunctionArguments.RouterRequestObject
      // ]`
    })
  })
};
exports.GenezisRulesConfig = GenezisRulesConfig;