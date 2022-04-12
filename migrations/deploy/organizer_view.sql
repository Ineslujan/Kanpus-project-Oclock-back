-- Deploy kanpus:organizer_view to pg

BEGIN;
-- Main view of the app
	--Compiling most of the datas from user, place, event to project on the organizer page
CREATE VIEW organizer AS
SELECT 
	kanpus_event.id AS event_id, 
	kanpus_event.name AS name,
	Kanpus_event.address AS address,
	Kanpus_event.note AS note,
	Kanpus_event.equipment AS equipment,
	Kanpus_event.role AS role,
	kanpus_event.start_date AS start_date,
	(kanpus_event.start_date + kanpus_event.duration) AS end_date,
	kanpus_place.id AS place_id,
	kanpus_place.name AS place_name,
	kanpus_place.position AS place_position,
	kanpus_event.duration AS duration,
	extract(isodow from kanpus_event.start_date) AS dotw_number, 
	COALESCE(json_agg(json_build_object('id',kanpus_user_former.id,'firstname',kanpus_user_former.firstname,'lastname',kanpus_user_former.lastname, 'color', kanpus_user_former.color)) FILTER (WHERE kanpus_user_former.firstname IS NOT NULL), '[]') AS former,
	COALESCE(json_agg(json_build_object('id',kanpus_user_trainee.id,'firstname',kanpus_user_trainee.firstname,'lastname',kanpus_user_trainee.lastname, 'is_absent', kanpus_user_has_event.is_absent)) FILTER (WHERE kanpus_user_trainee.firstname IS NOT NULL), '[]') AS trainee
	FROM kanpus_event
	JOIN kanpus_place ON kanpus_place.id = kanpus_event.place_id
	JOIN kanpus_user_has_event ON kanpus_user_has_event.event_id = kanpus_event.id
	LEFT JOIN kanpus_user kanpus_user_former 
	ON kanpus_user_has_event.user_id = kanpus_user_former.id
	AND kanpus_user_former.role = 'former'
	LEFT JOIN kanpus_user kanpus_user_trainee 
	ON kanpus_user_has_event.user_id = kanpus_user_trainee.id
	AND kanpus_user_trainee.role = 'trainee'
	GROUP BY kanpus_event.id , kanpus_place.id
	ORDER BY kanpus_event.id	
;

COMMIT;
