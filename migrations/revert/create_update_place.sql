-- Revert kanpus:create_update_place from pg

BEGIN;

DROP FUNCTION IF EXISTS add_place;

DROP FUNCTION IF EXISTS update_place;

COMMIT;
