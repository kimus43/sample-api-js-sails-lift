var winston = require('winston');

module.exports = {
  inject_logger: function () {
    var logger = new (winston.Logger)({
      transports: [
        new winston.transports.File({ filename: 'logs.log' }),
      ],
      exceptionHandlers: [
        new winston.transports.File({ filename: 'exceptions.log' }),
      ],
    });
    logger.exitOnError = false;
    return logger;
  },
  inject_info_logger: function () {
    var logger = new (winston.Logger)({
      transports: [
        new (winston.transports.Console)(),
        new (winston.transports.File)({ filename: 'logs_info.log' }),
      ],
    });
    logger.exitOnError = false;
    return logger;
  },

}
