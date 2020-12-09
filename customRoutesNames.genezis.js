import GenezisChecker from "@genezis/genezis/Checker";

export default {
    genezisConfig: {
        routesNames: GenezisChecker.object()
    },

    getRoutesNames: (config, DefaultRoutesNames) => {
        const OriginalRoutesNamesKeys = Object.keys(DefaultRoutesNames);

        if (config.routesNames) {
            config.routesNames = Object.assign({}, DefaultRoutesNames, config.routesNames);

            // Check if the custom route names not contains wrong values
            const UserRoutesNamesKeys = Object.keys(config.routesNames);

            if (OriginalRoutesNamesKeys.length != UserRoutesNamesKeys.length) throw new Error();
        } else {
            config.routesNames = DefaultRoutesNames;
        }
    }
}
