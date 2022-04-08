-- Revert kanpus:create_update_promo from pg

BEGIN;
DROP FUNCTION IF EXISTS add_promo;

DROP FUNCTION IF EXISTS update_promo;
-- XXX Add DDLs here.

COMMIT;
