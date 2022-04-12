/**
 * 
 * "fatal" (60):
 *     The service/app is going to stop or
 *     become unusable now. An operator should definitely look into this soon.
 * "error" (50): Fatal for a particular request,
 *     but the service/app continues servicing other requests.
 *     An operator should look at this soon(ish).
 * "warn" (40):
 *     A note on something that should probably
 *     be looked at by an operator eventually.
 * "info" (30):
 *     Detail on regular operation.
 * "debug" (20):
 *     Anything else, i.e. too verbose to be included in "info" level.
 * "trace" (10):
 *     Logging from external libraries used by
 *     your app or very detailed application logging.
 */

 const bunyan = require('bunyan');

 // possibility to add new streams
 const streams = [];
 
 streams.push({
     level: 'trace', // starting loggin from trace errors
     path: './logs/error.log',
     type: 'rotating-file', // Rotation set on log file
     period: '1d', // Daily rotation
     count: 3, // 3 days of saved logs
 });
 
//  Creation of the logger
 const logger = bunyan.createLogger({
     name: 'Kanpus API',
     streams,
 });
 
 module.exports = logger;