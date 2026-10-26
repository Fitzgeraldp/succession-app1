-- Explicit document-assembly order for a clause, independent of clause_rules
-- (which governs whether a clause is *included*, not where it sits in the
-- final document). Without this, unconditional clauses (no clause_rules row)
-- and conditional ones sort unpredictably relative to each other.
ALTER TABLE clauses ADD COLUMN sort_order INT NOT NULL DEFAULT 0;
