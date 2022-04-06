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


    debug(`> getOrganizer()`);
    if (!data) {
      throw new ApiError('No data found for getOrganizer', 500);
    }
    return data;
  },

  async checkFormerIsAvailabe(startDate, endDate) {
    //checkIsAvailabeFormer
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

    debug(`> checkFormerIsAvailabe()`);
    if (!data) {
      throw new ApiError('No data found for checkFormerIsAvailabe()', 500);
    }

    return data;
  },

  async checkPlaceIsAvailabe(startDate, endDate) {
  //checkIsAvailabePlace
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

    debug(`> checkPlaceIsAvailabe()`);
    if (!data) {
      throw new ApiError('No data found for checkPlaceIsAvailabe()', 500);
    }

    return data;
  },

  async addEvent(form) {
    const user = form.trainee.concat(form.former);
    const query = `SELECT * FROM add_event($1);`;
    const value = [form];

    const data = (await dataBase.query(query, value)).rows[0];
    const resultUsers = [];
    for(const e of user){

      const query = `INSERT INTO kanpus_user_has_event (user_id,event_id) VALUES ($1,$2) RETURNING *;`;
      const value = [e, data.id];

      const result = (await dataBase.query(query, value)).rows[0];
      
      resultUsers.push(result)
    }
    debug(`> addEvent()`);
    return {
      data,
      resultUsers
    };
  },

  async getAllEventForUser(user_id,page_number) {
    const pageSize = 6;
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
    debug(`> getAllEventForUser()`);
    if (!data) {
      throw new ApiError('No data found for getAllEventForUser', 500);
    }
    return data;
  },

  async updateEventById(form,event_id) {

    const query = `SELECT * FROM update_event($1,$2);`;
    const values = [form,Number(event_id)];
    const data = (await dataBase.query(query,values)).rows;
    //debug(`> UPDATE updateEventById(): ${query}`);

    const queryDelete = `DELETE FROM kanpus_user_has_event WHERE event_id = $1;`;
    const valuesDelete = [event_id];
    await dataBase.query(queryDelete,valuesDelete);
    //debug(`> DELETE USER FOR updateEventById(): ${queryDelete}`);

    const user = form.trainee.concat(form.former);
    console.log("all user",user);
    const resultUsers = [];
    for(const e of user){

      const query = `INSERT INTO kanpus_user_has_event (user_id,event_id) VALUES ($1,$2) RETURNING *;`;
      const value = [e, Number(event_id)];
      const result = (await dataBase.query(query, value)).rows[0];
      
      resultUsers.push(result)
    }
    debug(`> updateEventById()`);
    if (!data) {
      throw new ApiError('No data to update updateEventById', 500);
    }
    return {data,resultUsers};
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
    debug(`> getEventById()`);
    if (!event) {
      throw new ApiError('No data to getEventById', 500);
    }
    return event;
  },

  async deleteEventById(event_id) {
    const query = `DELETE FROM kanpus_event WHERE id = $1`;
    const values = [event_id];

    const event = (await dataBase.query(query,values)).rows;
    debug(`> deleteEventById()`);
    if (!event) {
      throw new ApiError('No data to deleteEventById', 500);
    }
    return event;
  },

};