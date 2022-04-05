const debug = require('debug')('userDataMapper');
const dataBase = require('../config/db');
const ApiError = require('../errors/apiError');

module.exports = {
    async getAllTraineeByPromo(){

        const query = 
        `SELECT 
        kanpus_promo.name AS name,
        COALESCE(json_agg(json_build_object('id',kanpus_user.id,'firstname',kanpus_user.firstname,'lastname',kanpus_user.lastname)) FILTER (WHERE kanpus_user.lastname IS NOT NULL), '[]') AS trainee
        FROM kanpus_user
        JOIN kanpus_promo ON kanpus_user.promo_id = kanpus_promo.id
        WHERE kanpus_user.role = 'trainee'
        GROUP BY kanpus_promo.name;`;
        const data = (await dataBase.query(query)).rows;
        debug(`> getAllTraineeByPromo(): ${query}`);
        if (!data) {
          throw new ApiError('No data found for getAllTraineeByPromo()', 500);
        }
        return data;
    
      },
      async getAllTraineeByGroup(){
    
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
        debug(`> getAllTraineeByGroup(): ${query}`);
        if (!data) {
          throw new ApiError('No data found for getAllTraineeByGroup()', 500);
        }
        return data;
    
      },
};