-- Deploy kanpus:add_event_function to pg

BEGIN;

-- XXX Add DDLs here.
CREATE OR REPLACE FUNCTION add_event(d json) RETURNS kanpus_event AS $$

    INSERT INTO kanpus_event
    (name, address, note, equipment, role, start_date, duration, place_id)
    VALUES(
        (d->>'name')::text,
        (d->>'address')::text,
		(d->>'note')::text,
		(d->>'equipment')::text,
		(d->>'role')::text,
        (d->>'start_date')::timestamp,
		(d->>'end_date')::timestamp - (d->>'start_date')::timestamp,
		(d->>'place_id')::int
		
    ) RETURNING *;

$$ LANGUAGE sql;
COMMIT;
