-- Revert kanpus:view_my_course from pg

BEGIN;

DROP VIEW IF EXISTS my_course;
-- XXX Add DDLs here.

COMMIT;
