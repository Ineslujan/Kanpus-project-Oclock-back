-- Verify kanpus:init on pg

BEGIN;

-- XXX Add verifications here.

SELECT * FROM kanpus_user_has_group WHERE false;
SELECT * FROM kanpus_group WHERE false;
SELECT * FROM kanpus_user_has_event WHERE false;
SELECT * FROM kanpus_user WHERE false;
SELECT * FROM kanpus_promo WHERE false;
SELECT * FROM kanpus_event WHERE false;
SELECT * FROM kanpus_place WHERE false;

ROLLBACK;
