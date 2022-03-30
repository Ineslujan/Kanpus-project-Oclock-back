-- Revert kanpus:init from pg

BEGIN;

DROP TABLE IF EXISTS kanpus_user_has_group;
DROP TABLE IF EXISTS kanpus_group;
DROP TABLE IF EXISTS kanpus_user_has_event;
DROP TABLE IF EXISTS kanpus_user;
DROP TABLE IF EXISTS kanpus_promo;
DROP TABLE IF EXISTS kanpus_event;
DROP TABLE IF EXISTS kanpus_place;
DROP DOMAIN nametext;

COMMIT;
