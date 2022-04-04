
const debug = require('debug')('dataMapper');
const dataBase = require('../config/db');
const ApiError = require('../errors/apiError');

const dataMapper = {
  async getOrganizer() {
    const query = 'SELECT * FROM organizer;';
    const data = (await dataBase.query(query)).rows;
    debug(`> getOrganizer(): ${query}`);
    if (!data) {
      throw new ApiError('No data found for getOrganizer', 500);
    }
    return data;
  },
  
  
  
  }