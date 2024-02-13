const { RateLimiterMemory } = require('rate-limiter-flexible');

class HttpMiddleware {
  #rateLimiter;
  constructor() {
    this.#rateLimiter = new RateLimiterMemory({
      points: 10,
      duration: 2,
    });
  }

  limitRate = async (req, res, next) => {
    try {
      //   console.log('here', this.#rateLimiter);
      await this.#rateLimiter.consume(req.ip, 5);
      next();
    } catch (error) {
      res.status(429).send('Too Many Requests');
    }
  };
}

module.exports = HttpMiddleware;
