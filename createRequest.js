import RequestError from "./RequestError";
import _GenezisConfig from "genezis/Checker";

function getRequestData(req, routeType) {
    return req.method == "GET" ? req.query : req.body;
}

export default (settings = {}, f) => {
    return async (req, res) => {
        let onSuccess = (response) => {
            res.json(response);
        };

        const data = getRequestData(req);
        if (settings.onBegin) {
            for (let i=0, length=settings.onBegin.length; i < length; ++i) {
                await settings.onBegin[i](req, data);
            }
        }

        try {
            await f(req, data, onSuccess);
        } catch (error) {
            //eee

            throw error;
        }
    }
}

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
}