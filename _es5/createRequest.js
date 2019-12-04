import _GenezisConfig from "@genezis/genezis/Checker";

function getRequestData(req) {
  return req.method == "GET" ? req.query : req.body;
}

export default ((settings = {}, f) => {
  return async (req, res, next) => {
    let sharedData = {};

    let onSuccess = (response, callNext = false, resMethod = "json", resEndType) => {
      if (callNext) {
        next();
        return;
      }

      if (resEndType) res[resMethod](response, resEndType);else res[resMethod](response);
    };

    const data = getRequestData(req);

    if (settings.onBegin) {
      for (let i = 0, length = settings.onBegin.length; i < length; ++i) {
        await settings.onBegin[i](req, data, sharedData);
      }
    }

    try {
      await f(req, data, onSuccess, sharedData);
    } catch (error) {
      //eee
      throw error;
    }
  };
});
/**
 * @name GenezisRulesConfigParams
 * 
 * @param {RequestFunction[]} onBegin an array of RequestFunction functions that are called in the beggining of the request
 */

/**
 * 
 */

export const GenezisRulesConfig = {
  onBegin: _GenezisConfig.array({
    of: _GenezisConfig.function({// `arguments: [
      //     _GenezisConfig.FunctionArguments.RouterRequestObject
      // ]`
    })
  })
};