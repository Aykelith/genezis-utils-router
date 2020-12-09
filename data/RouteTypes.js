const RouteTypes = {
    GET: 0,
    POST: 1,

    ALL: 9
};

export default RouteTypes;

export const RouteTypesValues = Object.values(RouteTypes);

export function createRouteFunction(routeType) {
    switch (routeType) {
        case RouteTypes.GET: return "get";
        case RouteTypes.POST: return "post";
        case RouteTypes.ALL: return "all";
        default: throw new Error();
    }
}