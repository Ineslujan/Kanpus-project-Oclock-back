-- Deploy kanpus:create_update_user_functions to pg

BEGIN;
CREATE OR REPLACE FUNCTION add_user(d json) RETURNS kanpus_user AS $$

    INSERT INTO kanpus_user
    (firstname, lastname, address, phone_number, email, password, image, color, role, is_permanent, promo_id)
    VALUES(
        (d->>'firstname')::text,
        (d->>'lastname')::text,
		(d->>'address')::text,
		(d->>'phone_number')::text,
        (d->>'email')::text,
		(d->>'password')::text,
        (d->>'image')::text,
		(d->>'color')::text,
		(d->>'role')::text,
		(d->>'is_permanent')::boolean,
		(d->>'promo_id')::int
		
    ) RETURNING *;

$$ LANGUAGE sql;

CREATE OR REPLACE FUNCTION update_user(d json,user_id int) RETURNS kanpus_user AS $$

	UPDATE kanpus_user
	SET
		firstname = (d->>'firstname')::text,
       	lastname = (d->>'lastname')::text,
		address = (d->>'address')::text,
		phone_number = (d->>'phone_number')::text,
        email = (d->>'email')::text,
        image = (d->>'image')::text,
		color = (d->>'color')::text,
		is_permanent = (d->>'is_permanent')::boolean,
		promo_id = (d->>'promo_id')::int,
		updated_at = NOW()
		WHERE id = user_id
		
	RETURNING *;
	
$$ LANGUAGE sql;
-- XXX Add DDLs here.

COMMIT;
