-- Verify kanpus:view_my_course on pg

BEGIN;

SELECT * FROM my_course  WHERE false;
-- XXX Add verifications here.

ROLLBACK;
