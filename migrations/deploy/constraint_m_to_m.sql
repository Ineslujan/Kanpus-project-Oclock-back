-- Deploy kanpus:constraint_m_to_m to pg

BEGIN;
-- Constraint on table user_has_event and user_has_group restricting same combination from 2 columns entered into 2 rows
-- User_id=1 and Group_id=2 at id=1, this user and group id combination won't be insert in another id if it already exists
ALTER TABLE kanpus_user_has_event
  ADD CONSTRAINT check_values_rows_uhase UNIQUE(user_id, event_id);

ALTER TABLE kanpus_user_has_group
  ADD CONSTRAINT check_values_rows_uhasg UNIQUE(user_id, group_id);


COMMIT;
