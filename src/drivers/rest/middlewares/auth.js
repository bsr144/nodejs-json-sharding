class AuthMiddleware {
  constructor(logger) {
    this.logger = logger;
  }
  authenticateIncomingRequest = async (req, res, next) => {
    this.logger.info('you are authenticated');
    next();
  };
}

module.exports = AuthMiddleware;
