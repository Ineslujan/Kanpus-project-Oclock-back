-- Deploy kanpus:create_update_promo to pg

BEGIN;
CREATE OR REPLACE FUNCTION add_promo(d json) RETURNS kanpus_promo AS $$

    INSERT INTO kanpus_promo
    (name)
    VALUES(
        (d->>'name')::text
        
		
    ) RETURNING *;

$$ LANGUAGE sql;

CREATE OR REPLACE FUNCTION update_promo(d json,promo_id int) RETURNS kanpus_promo AS $$

	UPDATE kanpus_promo
	SET
		name = (d->>'name')::text,
		updated_at = NOW()
		WHERE id = promo_id
		
	RETURNING *;
	
$$ LANGUAGE sql;
-- XXX Add DDLs here.

COMMIT;
