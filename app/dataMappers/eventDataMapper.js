
const debug = require('debug')('dataMapper');
const dataBase = require('../config/db');
const ApiError = require('../errors/apiError');

module.exports = {
  async getOrganizer(date) {

    const query = `SELECT * FROM organizer
    WHERE (
			organizer.start_date 
			BETWEEN $1::timestamptz AND $1::timestamptz + '4 23:59:00'::interval
			OR
			organizer.end_date 
			BETWEEN $1::timestamptz AND $1::timestamptz + '4 23:59:00'::interval
		)
		OR (
			$1::timestamptz
			BETWEEN organizer.start_date AND organizer.end_date 
			OR
			$1::timestamptz + '4 23:59:00'::interval
			BETWEEN organizer.start_date AND organizer.end_date 
		)`;
    const value= [date]
    const data = (await dataBase.query(query,value)).rows;


    debug(`> getOrganizer(): ${query}`);
    if (!data) {
      throw new ApiError('No data found for getOrganizer', 500);
    }
    return data;
  },

  async checkIsAvailabeFormer(startDate,endDate){

    const query = `SELECT
                    kanpus_user.id AS user_id,
                    kanpus_user.firstname,
                    kanpus_user.lastname,
                    ARRAY_AGG(dispo.name) AS event
                FROM kanpus_user
                LEFT JOIN (
                    SELECT DISTINCT kanpus_user.id,
                    kanpus_user.firstname,
                    kanpus_event.name
                    FROM kanpus_user_has_event
                    JOIN kanpus_event ON kanpus_event.id = kanpus_user_has_event.event_id
                    JOIN kanpus_user ON kanpus_user.id = kanpus_user_has_event.user_id
                    WHERE (
                            kanpus_event.start_date 
                            BETWEEN $1 AND $2
                            OR
                            (kanpus_event.start_date + kanpus_event.duration) 
                            BETWEEN $1 AND $2
                        )
                        OR (
                            $1 
                            BETWEEN kanpus_event.start_date AND (kanpus_event.start_date + kanpus_event.duration) 
                            OR
                            $2
                            BETWEEN kanpus_event.start_date AND (kanpus_event.start_date + kanpus_event.duration)
                        )
                )AS dispo ON dispo.id = kanpus_user.id 
                WHERE kanpus_user.role = 'former'
                GROUP BY kanpus_user.id
                ORDER BY kanpus_user.is_permanent DESC`;
                const value = [startDate,endDate]

    const data = (await dataBase.query(query,value)).rows;

    debug(`> checkIsAvailabeFormer()`);
    if (!data) {
      throw new ApiError('No data found for former', 500);
    }
      
        return data
  },

  async checkIsAvailabePlace(startDate,endDate){

    const query = `SELECT 
    kanpus_place.id,
    kanpus_place.name,
    ARRAY_AGG(dispo.event) AS event
    FROM kanpus_place
    LEFT JOIN (
        SELECT DISTINCT kanpus_place.id AS place_id,
        kanpus_event.name AS event
        FROM kanpus_place
        JOIN kanpus_event ON kanpus_event.place_id = kanpus_place.id
            WHERE (
                kanpus_event.start_date 
                BETWEEN $1 AND $2
                OR
                (kanpus_event.start_date + kanpus_event.duration) 
                BETWEEN $1 AND $2
            )
            OR (
                $1 
                BETWEEN kanpus_event.start_date AND (kanpus_event.start_date + kanpus_event.duration) 
                OR
                $2
                BETWEEN kanpus_event.start_date AND (kanpus_event.start_date + kanpus_event.duration)
            )
    ) AS dispo ON dispo.place_id = kanpus_place.id 
    GROUP BY kanpus_place.id`;
    const value = [startDate,endDate]

    const data = (await dataBase.query(query,value)).rows;

    debug(`> checkIsAvailabePlace()`);
    if (!data) {
      throw new ApiError('No data found for Place', 500);
    }
      
        return data
  }
  
  
  
  }