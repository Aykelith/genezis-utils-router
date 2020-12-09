//= Functions & Modules
// Packages
import nanoid from "nanoid/non-secure";
import GenezisGeneralError from "@genezis/genezis/GenezisGeneralError";

function preventMultipleCall_sessionVariableName(uniqueID) {
    return `genezis_preventMultipleCalls_${uniqueID}`;
}

function preventMultipleCalls_createOnBegin(sessionVariableName, uniqueID) {
    return async (req, data, sharedData) => {
        {
            let exists;
            if (settings.preventMultipleCalls_getSession) {
                exists = await settings.preventMultipleCalls_getSession(sessionVariableName, req);
            } else {
                exists = await global._genezis_router.preventMultipleCalls.getSession(sessionVariableName, req);
            }

            if (exists) throw new GenezisGeneralError(ERROR_ALREADY_IN_REQUEST);
        }

        sharedData.preventMultipleCalls_id = uniqueID;

        if (settings.preventMultipleCalls_saveSession) {
            await settings.preventMultipleCalls_saveSession(sessionVariableName, uniqueID, req);
        } else {
            await global._genezis_router.preventMultipleCalls.saveSession(sessionVariableName, uniqueID, req);
        }

        req.checkIfUniqueCall = async () => {
            let value;
            if (settings.preventMultipleCalls_checkSession) {
                value = await settings.preventMultipleCalls_checkSession(sessionVariableName, req);
            } else {
                value = await global._genezis_router.preventMultipleCalls.checkSession(sessionVariableName, req);
            }
    
            if (value == sharedData.preventMultipleCalls_id) {
                return true;
            } else {
                throw new GenezisGeneralError(ERROR_ALREADY_IN_REQUEST);
            }
        };
    }
}

function preventMultipleCalls_createOnEnd(sessionVariableName, uniqueID) {
    return async (req, data, sharedData) => {
        if (settings.preventMultipleCalls_cleanSession) {
            await settings.preventMultipleCalls_cleanSession(sessionVariableName, req);
        } else {
            await global._genezis_router.preventMultipleCalls.cleanSession(sessionVariableName, req);
        }
    }
}

export default (requestSettings) => {
    if (!global._genezis_router.preventMultipleCalls) throw new Error("preventMultipleCalls not initialzied");

    const uniqueID = nanoid();
    const sessionVariableName = preventMultipleCall_sessionVariableName(uniqueID);

    if (!requestSettings.onBegin) requestSettings.onBegin = [];
    requestSettings.onBegin.splice(0, 0, preventMultipleCalls_createOnBegin(sessionVariableName, uniqueID));

    if (!requestSettings.onEnd) requestSettings.onEnd = [];
    requestSettings.onEnd.splice(0, 0, preventMultipleCalls_createOnEnd(sessionVariableName, uniqueID));

    if (!requestSettings.onRequestError) requestSettings.onRequestError = [];
    requestSettings.onRequestError.splice(0, 0, preventMultipleCalls_createOnEnd(sessionVariableName, uniqueID));
}