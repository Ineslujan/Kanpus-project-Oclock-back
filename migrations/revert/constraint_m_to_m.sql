-- Revert kanpus:constraint_m_to_m from pg

BEGIN;

-- XXX Add DDLs here.
ALTER TABLE "kanpus_user_has_group"
DROP CONSTRAINT "check_values_rows_uhasg";

ALTER TABLE "kanpus_user_has_event"
DROP CONSTRAINT "check_values_rows_uhase";

COMMIT;
