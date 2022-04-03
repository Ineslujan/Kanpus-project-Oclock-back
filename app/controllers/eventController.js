const debug = require('debug')('eventController');
const DataMapper = require('../dataMappers/eventDataMapper');

module.exports = {

  getOrganizer: async (_req, res, next) => {
    const organizer = await DataMapper.getOrganizer();
    debug('get organizer called');
    if (organizer) {
        res.json(organizer);
    }
    else{
        next();
    }
  },
  
  };
