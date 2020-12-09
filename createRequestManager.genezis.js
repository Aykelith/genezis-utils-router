import GenezisChecker from "@genezis/genezis/Checker";
import deleteOnProduction from "@genezis/genezis/utils/deleteOnProduction";
import RequestManager from "./RequestsManager";

import { GenezisChecker as RouteStructureGenezisConfig } from "./createRouteStructure";

const GenezisCheckerConfig = deleteOnProduction({
    routes: GenezisChecker.array({
        of: GenezisChecker.or([
            GenezisChecker.object({
                shape: {
                    mainPath: GenezisChecker.or([
                        GenezisChecker.string(),
                        GenezisChecker.array({ of: GenezisChecker.string() })
                    ]).required(),
                    routesData: GenezisChecker.array({
                        of: RouteStructureGenezisConfig
                    }).required()
                }
            }),
            RouteStructureGenezisConfig
        ])
    }).required(),

    routeErrorHandler: GenezisChecker.or([
        GenezisChecker.function(),
        GenezisChecker.array({ of: GenezisChecker.function() })
    ]).required()
});

export default (settings) => {
    GenezisChecker(settings, GenezisCheckerConfig);

    return (app) => {
        let requestManager = new RequestManager(app);

        settings.routes.forEach(routeData => {
            if (routeData.mainPath) {
                requestManager.addGroupRoutes(routeData.mainPath, routeData.routesData);
            } else {
                requestManager.addRoute(routeData.requestType, routeData.path, routeData.requestFunc);
            }
        });

        if (Array.isArray(settings.routeErrorHandler)) requestManager.use(...settings.routeErrorHandler);
        else                                           requestManager.use(settings.routeErrorHandler);

        return requestManager;
    }
}
