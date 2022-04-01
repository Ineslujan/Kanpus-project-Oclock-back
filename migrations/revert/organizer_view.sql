-- Revert kanpus:organizer_view from pg

BEGIN;
DROP VIEW organizer;
-- XXX Add DDLs here.

COMMIT;
