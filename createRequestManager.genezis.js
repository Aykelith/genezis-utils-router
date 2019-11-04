import GenezisChecker from "@genezis/genezis/Checker";
import deleteOnProduction from "@genezis/genezis/utils/deleteOnProduction";
import RequestManager from "./RequestsManager";
import createRouteErrorHandle from "./createRouteErrorHandle";

import { GenezisChecker as RouteStructureGenezisConfig } from "./createRouteStructure";

const GenezisCheckerConfig = deleteOnProduction({
    routes: GenezisChecker.array({
        of: GenezisChecker.or([
            GenezisChecker.object({
                shape: {
                    mainPath: GenezisChecker.string().required(),
                    routesData: GenezisChecker.array({
                        of: RouteStructureGenezisConfig
                    }).required()
                }
            }),
            RouteStructureGenezisConfig
        ])
    }).required(),

    routeErrorHandler: GenezisChecker.function()
});

export default (settings) => {
    GenezisChecker(settings, GenezisCheckerConfig);

    let routeErrorHandle = settings.routeErrorHandler || createRouteErrorHandle({
        logger: _LOGGER_FACTORY.createLogger("router")
    });

    return (app) => {
        let requestManager = new RequestManager(app);

        settings.routes.forEach(routeData => {
            if (routeData.mainPath) {
                requestManager.addGroupRoutes(routeData.mainPath, routeData.routesData);
            } else {
                requestManager.addRoute(routeData.requestType, routeData.path, routeData.requestFunc);
            }
        });

        requestManager.use(routeErrorHandle);

        return requestManager;
    }
}
