//= Functions & Modules
import GenezisChecker from "@genezis/genezis/Checker";
import deleteOnProduction from "@genezis/genezis/utils/deleteOnProduction";

const GenezisCheckerConfig = deleteOnProduction({
    extraRequestData: GenezisChecker.function()
});

export default (settings) => {
    GenezisChecker(settings, GenezisCheckerConfig);

    if (process.env.NODE_ENV === "production") {
        return () => { return () => {}; };
    }

    return (head = "HEAD_IS_NOT_SETTED") => {
        return (req, data) => console.debug(`${head}${settings.extraRequestData ? settings.extraRequestData(req, data) : ""}Entered with data:"${JSON.stringify(data)}"`);
    }
}