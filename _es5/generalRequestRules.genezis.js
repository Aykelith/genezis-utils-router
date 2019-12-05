"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _default = {
  onBegin: GenezisChecker.array({
    of: GenezisChecker["function"]({
      arguments: [GenezisChecker.FunctionArguments.RouterRequestObject]
    })
  })
};
exports["default"] = _default;