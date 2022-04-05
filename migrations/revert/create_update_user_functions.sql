-- Revert kanpus:create_update_user_functions from pg

BEGIN;

DROP FUNCTION IF EXISTS add_user;
DROP FUNCTION IF EXISTS update_user;
-- XXX Add DDLs here.

COMMIT;
