const debug = require('debug')('userDataMapper');
const dataBase = require('../config/db');
const ApiError = require('../errors/apiError');

module.exports = {
    async getUserGroupByPromo(){

        const query = 
        `SELECT 
        kanpus_promo.name AS name,
        COALESCE(json_agg(json_build_object('id',kanpus_user.id,'firstname',kanpus_user.firstname,'lastname',kanpus_user.lastname)) FILTER (WHERE kanpus_user.lastname IS NOT NULL), '[]') AS trainee
        FROM kanpus_user
        JOIN kanpus_promo ON kanpus_user.promo_id = kanpus_promo.id
        WHERE kanpus_user.role = 'trainee'
        GROUP BY kanpus_promo.name;`;
        const data = (await dataBase.query(query)).rows;
        debug(`> getUserGroupByPromo(): ${query}`);
        if (!data) {
          throw new ApiError('No data found for getUserGroupByPromo()', 500);
        }
        return data;
    
      },
      async getUserGroupByGroup(){
    
        const query = 
        `SELECT 
        kanpus_group.name,
        COALESCE(json_agg(json_build_object('id',kanpus_user.id,'firstname',kanpus_user.firstname,'lastname',kanpus_user.lastname)) FILTER (WHERE kanpus_user.lastname IS NOT NULL), '[]') AS trainee
        FROM kanpus_user
        JOIN kanpus_user_has_group ON kanpus_user_has_group.user_id = kanpus_user.id
        JOIN kanpus_group ON kanpus_user_has_group.group_id = kanpus_group.id
        WHERE kanpus_user.role = 'trainee'
        GROUP BY kanpus_group.name;`;
        const data = (await dataBase.query(query)).rows;
        debug(`> getUserGroupByGroup(): ${query}`);
        if (!data) {
          throw new ApiError('No data found for getUserGroupByGroup()', 500);
        }
        return data;
    
      },

      async addUser(form) {

        console.log(form);

        const query = `SELECT * FROM add_user($1);`;
        const value = [form];
    
        const data = (await dataBase.query(query, value)).rows[0];
        debug(`> addUser(): ${query}`);
        if (!data) {
          throw new ApiError('No data found for > addUser()', 500);
        }
        
        return data;
      },
};