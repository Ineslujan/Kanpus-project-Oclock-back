const debug = require('debug')('userDataMapper');
const dataBase = require('../config/db');
const ApiError = require('../errors/apiError');

module.exports = {
    // Get all trainees with a promo sort by promo name
    async getAllTraineeWithPromoByPromo(){
      // getUserGroupByPromo
        const query = 
        `SELECT 
        kanpus_promo.name AS name,
        COALESCE(json_agg(json_build_object('id',kanpus_user.id,'firstname',kanpus_user.firstname,'lastname',kanpus_user.lastname)) FILTER (WHERE kanpus_user.lastname IS NOT NULL), '[]') AS trainee
        FROM kanpus_user
        JOIN kanpus_promo ON kanpus_user.promo_id = kanpus_promo.id
        WHERE kanpus_user.role = 'trainee'
        GROUP BY kanpus_promo.name;`;
        const data = (await dataBase.query(query)).rows;
        debug(`> getAllTraineeWithPromoByPromo()`);
        if (!data) {
          throw new ApiError('No data found for getAllTraineeWithPromoByPromo()', 404);
        }
        return data;
    
      },

    // Get all trainees sorted by groups
    async getAllTraineeByGroup(){
    //getUserGroupByGroup
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
      debug(`> getAllTraineeByGroup()`);
      if (!data) {
        throw new ApiError('No data found for getAllTraineeByGroup()', 404);
      }
      return data;
    
    },

      //Get all trainees by promo + all trainees without promo
      async getAllTraineeByPromo() {
        //getUserByGroup
        const query = `
          SELECT 
          CASE 
              WHEN kanpus_promo.name IS NULL THEN 'Sans promo'
              ELSE kanpus_promo.name
          END AS promo,
          COALESCE(json_agg(json_build_object(
                'id',kanpus_user.id,
                'firstname',kanpus_user.firstname,
                'lastname',kanpus_user.lastname,
                'address',kanpus_user.address,
                'phone_number',kanpus_user.phone_number,
                'email',kanpus_user.email,
                'image',kanpus_user.image,
                'promo' ,kanpus_promo.name
          )) 
        FILTER (WHERE kanpus_user.firstname IS NOT NULL), '[]') AS trainee
        FROM kanpus_user
        FULL JOIN kanpus_promo ON kanpus_promo.id = kanpus_user.promo_id
        WHERE role = 'trainee'
        GROUP BY kanpus_promo.name
        `;
    
        const data = (await dataBase.query(query)).rows;
        debug(`> getAllTraineeByPromo()`);
        if (!data) {
          throw new ApiError('No data found for > getAllTraineeByPromo()', 404);
        }
        
        return data;
      },

      // Get all formers sorted by is_ permanent
      async getAllFormerByIsPermanent(){
        // getUserGroupByIsPermanent
        const query = 
        `SELECT 
        CASE 
          WHEN kanpus_user.is_permanent IS true THEN 'Titulaires'
          WHEN kanpus_user.is_permanent IS false THEN 'Intervenants'
          ELSE 'null'
        END AS is_permanent,
        COALESCE(json_agg(json_build_object(
            'id',kanpus_user.id,
            'firstname',kanpus_user.firstname,
            'lastname',kanpus_user.lastname,
            'address',kanpus_user.address,
            'phone_number',kanpus_user.phone_number,
            'email',kanpus_user.email,
            'image',kanpus_user.image,
            'color',kanpus_user.color,
            'is_permanent',kanpus_user.is_permanent
        )) 
        FILTER (WHERE kanpus_user.firstname IS NOT NULL), '[]') AS former
        FROM kanpus_user
        WHERE kanpus_user.role = 'former'
        GROUP BY kanpus_user.is_permanent
        ORDER BY is_permanent DESC
    ;`;
        const data = (await dataBase.query(query)).rows;
        debug(`> getAllFormerByIsPermanent()`);
        if (!data) {
          throw new ApiError('No data found for getAllFormerByIsPermanent()', 404);
        }
        return data;
    
      },

      async getUserById (user_id) {

        const query = `
        SELECT 
          kanpus_user.id,
          kanpus_user.firstname,
          kanpus_user.lastname,
          kanpus_user.address,
          kanpus_user.phone_number,
          kanpus_user.email,
          kanpus_user.image,
          kanpus_user.color,
          kanpus_promo.name AS promo
          FROM kanpus_user
          FULL JOIN kanpus_promo ON kanpus_user.promo_id = kanpus_promo.id
          WHERE kanpus_user.id = $1
        ;`;
      
      const data = (await dataBase.query(query, [user_id])).rows[0];
      debug(`> getUserById()`);
        if (!data) {
          throw new ApiError('No data found for > getUserById()', 404);
        }
        
        return data;
      
      },

      async addUser(form) {

        const query = `SELECT * FROM add_user($1);`;
        const value = [form];
    
        const data = (await dataBase.query(query, value)).rows[0];
        debug(`> addUser()`);
        if (!data) {
          throw new ApiError('No data found for > addUser()', 400);
        }
        
        return data;
      },

      async updateUser(form,user_id) {

        const query = `SELECT * FROM update_user($1,$2);`;
        const value = [form, user_id];
    
        const data = (await dataBase.query(query, value)).rows[0];
        debug(`> updateUser()`);
        if (!data) {
          throw new ApiError('No data found for > updateUser()', 400);
        }
        
        return data;
      },

      async isFormer(user_id) {

        const query = `
        SELECT 
          CASE 
            WHEN kanpus_user.role = 'former' THEN true
	          WHEN kanpus_user.role = 'trainee' THEN false
        ELSE NULL
        END AS is_former
        FROM kanpus_user
        WHERE kanpus_user.id = $1
      ;`;

        const value = [user_id];
    
        const data = (await dataBase.query(query, value)).rows[0];
        debug(`> isFormer()`);
        if (!data) {
          throw new ApiError('No data found for > isFormer()', 404);
        }
        
        return data;
      },

      async updatePassword(new_password,user_id) {

        const query = `
        UPDATE kanpus_user
        SET 
        password = $1,
        updated_at = NOW()
        WHERE id = $2
        RETURNING id
      ;`;

        const value = [new_password,user_id];
    
        const data = (await dataBase.query(query, value)).rows[0];
        debug(`> updatePassword()`);
        if (!data) {
          throw new ApiError('No data found for > updatePassword()', 400);
        }
        
        return data;
      },

      async getPasswordById(user_id) {

        const query = `SELECT password FROM kanpus_user WHERE id = $1`;

        const value = [user_id];
    
        const data = (await dataBase.query(query, value)).rows[0];
        debug(`> getPasswordById()`);
        if (!data) {
          throw new ApiError('No data found for > getPasswordById()', 404);
        }
        
        return data;
      },

      async deleteUser(user_id) {

        const query = `DELETE FROM kanpus_user WHERE id = $1 RETURNING id`;

        const value = [user_id];
    
        const data = (await dataBase.query(query, value)).rows[0];
        debug(`> deleteUser()`);
        if (!data) {
          throw new ApiError('No data found for > deleteUser()', 400);
        }
        
        return data;
      },

      async getUserByEmail(email) {

        const query = `SELECT * FROM "kanpus_user" WHERE email = $1`;

        const value = [email];
    
        const data = (await dataBase.query(query, value)).rows[0];
        debug(`> getUserByEmail()`);
        if (!data) {
          return false
        }
        
        return data;
      }

      
};

