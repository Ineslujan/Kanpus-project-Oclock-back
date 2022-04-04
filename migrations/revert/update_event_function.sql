-- Revert kanpus:update_event_function from pg

BEGIN;

DROP FUNCTION IF EXISTS update_event;

COMMIT;
