const Logger = require("../logger");

function logRequest(req, res, next) {
  const logger = new Logger("logRequest");

  logger.info(
    `${req.method} ${req.originalUrl} ${JSON.stringify(req.session)}`
  );

  logger.debug(req.body);
  logger.debug(req.params);
  logger.debug(req.query);

  return next();
}

module.exports = {
  logRequest,
};
