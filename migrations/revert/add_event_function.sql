-- Revert kanpus:add_event_function from pg

BEGIN;

-- XXX Add DDLs here.
DROP FUNCTION IF EXISTS add_event;
COMMIT;
