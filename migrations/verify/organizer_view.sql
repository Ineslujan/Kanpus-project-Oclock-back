-- Verify kanpus:organizer_view on pg

BEGIN;

-- XXX Add verifications here.
SELECT * FROM organizer  WHERE false;
ROLLBACK;
