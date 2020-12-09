import _GenezisConfig from "@genezis/genezis/Checker";
import { RouteTypesValues } from "./data/RouteTypes";

export default (requestType, path, requestFunc) => {
    return {
        requestType: requestType,
        path: path,
        requestFunc: requestFunc
    };
}

export const GenezisChecker = _GenezisConfig.object({
    shape: {
        requestType: _GenezisConfig.required().integer().oneOf(RouteTypesValues),
        path: _GenezisConfig.or([
            _GenezisConfig.string(),
            _GenezisConfig.array({ of: _GenezisConfig.string() })
        ]).required(),
        requestFunc: _GenezisConfig.or([
            _GenezisConfig.function(),
            _GenezisConfig.array({ of: _GenezisConfig.function() })
        ]).required()
    }
});
