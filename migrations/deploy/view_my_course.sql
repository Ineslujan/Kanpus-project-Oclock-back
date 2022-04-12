-- Deploy kanpus:view_my_course to pg

BEGIN;
-- Rejoigning table kanpus_user to the organizer view to target a specific user_id
CREATE OR REPLACE VIEW my_course AS
SELECT organizer.event_id,
		organizer.name,
		organizer.address,
		organizer.note,
		organizer.role,
		organizer.equipment,
		organizer.start_date,
		organizer.end_date,
		organizer.place_name,
		organizer.place_id,
		organizer.former,
		organizer.trainee,
		kanpus_user.id AS user_id
FROM organizer
 JOIN kanpus_user_has_event ON kanpus_user_has_event.event_id = organizer.event_id
 LEFT JOIN  kanpus_user ON kanpus_user.id = kanpus_user_has_event.user_id;
-- XXX Add DDLs here.

COMMIT;
