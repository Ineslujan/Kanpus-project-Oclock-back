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

      

      async addPlace(form) {

        const query = `SELECT * FROM add_place($1);`;
        const value = [form];
    
        const data = (await dataBase.query(query, value)).rows[0];
        debug(`> addPlace()`);
        if (!data) {
          throw new ApiError('No data found for > addPlace()', 500);
        }
        
        return data;

      },

      async updatePlaceById(form,place_id) {

        const query = `SELECT * FROM update_place($1,$2);`;
        const value = [form, place_id];
    
        const data = (await dataBase.query(query, value)).rows[0];
        debug(`> updatePlace()`);
        if (!data) {
          throw new ApiError('No data found for > updatePlace()', 500);
        }
        
        return data;

      },

      async deletePlaceById(place_id) {
        const query = `DELETE FROM kanpus_place WHERE id = $1 RETURNING id`;
        const values = [place_id];
    
        const place = (await dataBase.query(query,values)).rows[0];
        debug(`> deletePlaceById()`);
        if (!place) {
          throw new ApiError('No data to deletePlaceById', 500);
        }

        return place;

      },


}