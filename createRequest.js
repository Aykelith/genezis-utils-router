import _GenezisConfig from "@genezis/genezis/Checker";
import nanoid from "nanoid/non-secure";
import GenezisGeneralError from "@genezis/genezis/GenezisGeneralError";

export const ERROR_ALREADY_IN_REQUEST = "error:already_in_request";

function getRequestData(req) {
    return req.method == "GET" ? req.query : req.body;
}

function preventMultipleCall_sessionVariableName(uniqueID) {
    return `genezis_preventMultipleCalls_${uniqueID}`;
}

export default (settings = {}, f) => {
    let uniqueID, sessionVariableName;
    if (settings.preventMultipleCalls) {
        uniqueID = nanoid();
        sessionVariableName = preventMultipleCall_sessionVariableName(uniqueID);
    }

    return async (req, res, next) => {
        let sharedData = { req };
        let checkIfUniqueCall = () => {};

        if (settings.preventMultipleCalls) {
            if (req.session[sessionVariableName]) {
                throw new GenezisGeneralError(ERROR_ALREADY_IN_REQUEST);
            }
    
            sharedData.preventMultipleCalls_id = uniqueID;
            req.session[sessionVariableName] = uniqueID;
			
            await new Promise(resolve => req.session.save(resolve));

            checkIfUniqueCall = async () => {
                await new Promise(resolve => req.session.reload(resolve));
        
                if (req.session[sessionVariableName] == sharedData.preventMultipleCalls_id) {
                    return true;
                } else {
                    throw new GenezisGeneralError(ERROR_ALREADY_IN_REQUEST);
                }
            };
        }

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

            await f(req, data, onSuccess, sharedData, res, checkIfUniqueCall);

            if (settings.preventMultipleCalls) {
                delete req.session[sessionVariableName];
                await new Promise(resolve => req.session.save(resolve));
            }

            if (settings.onEnd) {
                for (let i=0, length=settings.onEnd.length; i < length; ++i) {
                    await settings.onEnd[i](req, data, sharedData);
                }
            }
        } catch (error) {
            if (settings.preventMultipleCalls) {
                delete req.session[sessionVariableName];
                await new Promise(resolve => req.session.save(resolve));
            }

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
