const debug = require('debug')('promoDataMapper');
const dataBase = require('../config/db');
const ApiError = require('../errors/apiError');

module.exports = {


    async getAllPromo(){
    
        const query = 
        `SELECT id,
            name,
		    created_at
        FROM kanpus_promo
        ORDER BY created_at;`;
        const data = (await dataBase.query(query)).rows;
        debug(`> getAllPromo(): ${query}`);
        if (!data) {
          throw new ApiError('No data found for getAllPromo()', 404);
        }
        return data;
    
      },

    async addPromo(form) {
      
      const query = `SELECT * FROM add_promo($1);`;
      const value = [form];

      const data = (await dataBase.query(query, value)).rows[0];
      debug(`> addPromo()`);
      if (!data) {
        throw new ApiError('No data found for > addPromo()', 400);
      }
      
      return data;
    },
    
    async updatePromoById(form,promo_id) {

        const query = `SELECT * FROM update_promo($1,$2);`;
        const value = [form, promo_id];
    
        const data = (await dataBase.query(query, value)).rows[0];
        debug(`> updatePromo()`);
        if (!data) {
          throw new ApiError('No data found for > updatePromo()', 400);
        }
        
        return data;
    },

    async deletePromoById(promo_id) {
        const query = `DELETE FROM kanpus_promo WHERE id = $1 RETURNING id`;
        const values = [promo_id];
    
        const promo = (await dataBase.query(query,values)).rows[0];
        debug(`> deletePromoById()`);
        if (!promo) {
          throw new ApiError('No data to deletePromoById', 400);
        }
        return promo;
      },
}