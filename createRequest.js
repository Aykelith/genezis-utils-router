import _GenezisConfig from "@genezis/genezis/Checker";
import PreventMultipleCalls_requestSetup from "./PreventMultipleCalls_requestSetup";

export const ERROR_ALREADY_IN_REQUEST = "error:already_in_request";

function getRequestData(req) {
    return req.method == "GET" ? req.query : req.body;
}

export default (settings = {}, f) => {
    if (!global._genezis_router) throw new Error("Need to initialize genezis router");

    if (settings.preventMultipleCalls) PreventMultipleCalls_requestSetup(settings);

    return async (req, res, next) => {
        let sharedData = { req };

        let onSuccess = (response, callNext = false, resMethod = "json", resEndType, writeHeadParams) => {
            if (callNext) {
                next();
                return;
            }

            if (writeHeadParams) res.writeHead(writeHeadParams.status, writeHeadParams.headers);
            
            if (resEndType) res[resMethod](response, resEndType);
            else            res[resMethod](response);
        };

        const data = getRequestData(req);

        try {
            if (settings.onBegin) {
                for (let i=0, length=settings.onBegin.length; i < length; ++i) {
                    await settings.onBegin[i](req, data, sharedData);
                }
            }

            await f(req, data, onSuccess, sharedData, res);

            if (settings.onEnd) {
                for (let i=0, length=settings.onEnd.length; i < length; ++i) {
                    await settings.onEnd[i](req, data, sharedData);
                }
            }
        } catch (error) {
            if (settings.onRequestError) {
                for (let i=0, length=settings.onRequestError.length; i < length; ++i) {
                    await settings.onRequestError[i](req, data, sharedData, error);
                }
            }

            throw error;
        }
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
export const GenezisRulesConfig = {
    onBegin: _GenezisConfig.array({
        of: _GenezisConfig.function({
            // `arguments: [
            //     _GenezisConfig.FunctionArguments.RouterRequestObject
            // ]`
        })
    })
};
