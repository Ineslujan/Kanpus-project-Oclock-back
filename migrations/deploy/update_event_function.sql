-- Deploy kanpus:update_event_function to pg

BEGIN;

CREATE OR REPLACE FUNCTION update_event(d json,event_id int) RETURNS kanpus_event AS $$

    UPDATE kanpus_event
    SET
        name = (d->>'name')::text,
        address = (d->>'address')::text,
		note = (d->>'note')::text,
		equipment = (d->>'equipment')::text,
		role = (d->>'role')::text,
        start_date = (d->>'start_date')::timestamptz,
		duration = ((d->>'end_date')::timestamp - (d->>'start_date')::timestamp)::interval,
		place_id = (d->>'place_id')::int,
		updated_at = NOW()
		WHERE id = event_id 
		
    RETURNING *;

$$ LANGUAGE sql;

COMMIT;
