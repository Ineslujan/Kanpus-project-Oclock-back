const debug = require('debug')('placeDataMapper');
const dataBase = require('../config/db');
const ApiError = require('../errors/apiError');

module.exports = {

    async getAllPlace(){
    
        const query = 
        `SELECT id,
                name,
                position       
        FROM kanpus_place
        ORDER BY position;`;
        const data = (await dataBase.query(query)).rows;
        debug(`> getAllPlace(): ${query}`);
        if (!data) {
          throw new ApiError('No data found for getAllPlace()', 500);
        }
        return data;
    
      },
}