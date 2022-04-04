const debug = require('debug')('eventDataMapper');
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
		);`;
    const value = [date];
    const data = (await dataBase.query(query, value)).rows;


    debug(`> getOrganizer(): ${query}`);
    if (!data) {
      throw new ApiError('No data found for getOrganizer', 500);
    }
    return data;
  },

  async checkIsAvailabeFormer(startDate, endDate) {

    const query = `
    SELECT
    kanpus_user.id AS user_id,
    kanpus_user.firstname,
    kanpus_user.lastname,
    ARRAY_AGG(is_availabe.name) AS event
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
        )AS is_availabe ON is_availabe.id = kanpus_user.id 
        WHERE kanpus_user.role = 'former'
        GROUP BY kanpus_user.id
        ORDER BY kanpus_user.is_permanent DESC;`;

    const value = [startDate, endDate];

    const data = (await dataBase.query(query, value)).rows;

    debug(`> checkIsAvailabeFormer()`);
    if (!data) {
      throw new ApiError('No data found for former', 500);
    }

    return data;
  },

  async checkIsAvailabePlace(startDate, endDate) {

    const query = `
    SELECT 
    kanpus_place.id,
    kanpus_place.name,
    ARRAY_AGG(is_availabe.event) AS event
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
    ) AS is_availabe ON is_availabe.place_id = kanpus_place.id 
    GROUP BY kanpus_place.id;`;
    const value = [startDate, endDate];

    const data = (await dataBase.query(query, value)).rows;

    debug(`> checkIsAvailabePlace()`);
    if (!data) {
      throw new ApiError('No data found for Place', 500);
    }

    return data;
  },

  async addEvent(form) {
    console.log(form);
    const user = form.trainee.concat(form.former);
    const query = `SELECT * FROM add_event($1);`;
    const value = [form];

    const data = (await dataBase.query(query, value)).rows[0];

    user.forEach(async (e) => {

      const query = `INSERT INTO kanpus_user_has_event (user_id,event_id) VALUES ($1,$2);`;
      const value = [e, data.id];

      const result = (await dataBase.query(query, value)).rows[0];
      
    })
    return true;
  },

  async getAllEventForUser(user_id,page_number) {
    const pageSize = 2;
    const pageOffset = (page_number -1) * pageSize;
    const query = `
      SELECT * FROM my_course 
      WHERE user_id = $1
      AND '2021-09-27'::timestamptz < end_date
      ORDER BY start_date
      OFFSET $3
      FETCH NEXT $2 ROWS ONLY;`;
    const values = [user_id,pageSize,pageOffset];

    const data = (await dataBase.query(query,values)).rows;
    debug(`> getAllEventForUser(): ${query}`);
    if (!data) {
      throw new ApiError('No data found for getAllEventForUser', 500);
    }
    return data;
  },

  async updateEventById(form,event_id) {
    const query = `SELECT * FROM update_event($1,$2);`;
    const values = [form,event_id];

    const data = (await dataBase.query(query,values)).rows;
    debug(`> UPDATE updateEventById(): ${query}`);
    if (!data) {
      throw new ApiError('No data to update updateEventById', 500);
    }
    return data;
  },

  async getEventById(user_id) {
    const query = `
    SELECT 
    event_id,
    name,
    address,
    note,
    equipment,
    role,
    start_date,
    end_date,
    place_id,
    trainee,
    former
    FROM organizer
    WHERE event_id = $1`;
    const values = [user_id];

    const event = (await dataBase.query(query,values)).rows[0];
    debug(`> UPDATE updateEventById(): ${query}`);
    if (!event) {
      throw new ApiError('No data to getUserById', 500);
    }
    return event;
  },


};