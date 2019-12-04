import GenezisChecker from "@genezis/genezis/Checker";
import RequestError from "./RequestError";
export default (settings => {
  GenezisChecker(settings, {
    logger: GenezisChecker.required().object()
  });
  return (error, req, res, next) => {
    if (error instanceof RequestError) {
      let status = error.statusCode || 400;
      let message = error.message;
      res.status(status).json({
        message: message
      });

      if (status != 500) {
        return;
      }
    }

    console.error(`Error on "${req.url}":`, error);
    settings.logger.error(error, {
      url: req.url,
      "user-agent": req.headers["user-agent"],
      ip: req.headers["x-real-ip"]
    });
    res.status(500).end();
  };
});