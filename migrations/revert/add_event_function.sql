-- Revert kanpus:add_event_function from pg

BEGIN;

-- XXX Add DDLs here.
DROP FUNCTION add_event;
COMMIT;
