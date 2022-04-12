const debug = require('debug')('absenceDataMapper');
const dataBase = require('../config/db');
const ApiError = require('../errors/apiError');

module.exports = {
    // Get all absence with a promo sort by promo name
    async getAllAbsenceByUser(userId){
      
        const query = 
        `SELECT kanpus_user_has_event.event_id,
		        kanpus_event.start_date AS start_date,
		        kanpus_event.name AS event_name
        FROM kanpus_user_has_event
        JOIN kanpus_event ON kanpus_event.id = kanpus_user_has_event.event_id
        WHERE user_id = $1 AND is_absent = true
        ORDER BY start_date;`;
        
        const values = [userId]
        const data = (await dataBase.query(query,values)).rows;
        debug(`> getAllAbsenceByUser()`);
        if (!data) {
          throw new ApiError('No data found for getAllAbsenceByUser()', 404);
        }
        return data;
    
      },

      async resetAbsenceOfEvent(eventId){
      
        const query = 
        `UPDATE kanpus_user_has_event
        SET is_absent = false
        WHERE event_id = $1
        RETURNING id;`;
        
        const values = [eventId]
        const data = (await dataBase.query(query,values)).rows;
        debug(`> resetAbsenceOfEvent()`);
        if (!data) {
          throw new ApiError('No data found for resetAbsenceOfEvent()', 400)
        }
        return data;
    
      },

      async addAbsenceOfEvent(eventId,userId){
      
        const query = 
        `UPDATE kanpus_user_has_event
        SET is_absent = true
        WHERE event_id = $1
        AND user_id = $2
        RETURNING *;`;
        
        const values = [eventId,userId]
        const data = (await dataBase.query(query,values)).rows[0];
        debug(`> addAbsenceOfEvent()`);
        if (!data) {
          throw new ApiError('No data found for addAbsenceOfEvent()', 400);
        }
        return data;
    
      }

 

}