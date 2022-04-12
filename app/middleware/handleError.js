const debug = require('debug')('ErrorHandler');
const ApiError = require('../errors/apiError');
const logger = require('../helpers/logger');

const handleError = (error, _, response, next) => {
    
    debug(error.status)
    // loggin errors if not 500 as error if not loggin error as warn
    if (!error.status || error.status != 500) {
        logger.warn(error);
    } else {
        
        logger.error(error);
        debug(error);
    }

    // custom error
    if (error instanceof ApiError) {
        return response.status(error.status).json(error.message);
    }

    // if error 500 response status 500
    return response.status(500).json('Internal server error');
};

module.exports = handleError;