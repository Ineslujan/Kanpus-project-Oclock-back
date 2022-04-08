-- Deploy kanpus:create_update_place to pg

BEGIN;
CREATE OR REPLACE FUNCTION add_place(d json) RETURNS kanpus_place AS $$

    INSERT INTO kanpus_place
    (name, position)
    VALUES(
        (d->>'name')::text,
        (d->>'position')::int
		
    ) RETURNING *;

$$ LANGUAGE sql;

CREATE OR REPLACE FUNCTION update_place(d json,place_id int) RETURNS kanpus_place AS $$

	UPDATE kanpus_place
	SET
		name = (d->>'name')::text,
        position = (d->>'position')::int,
		updated_at = NOW()
		WHERE id = place_id
		
	RETURNING *;
	
$$ LANGUAGE sql;
-- XXX Add DDLs here.

COMMIT;
