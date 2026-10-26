-- Distinguishes which document a clause belongs to (e.g. 'will', 'epoa'),
-- so the same clauses/clause_rules tables can serve multiple document types.
-- Existing rows default to 'will' since that's the only document type that
-- existed before this migration.
ALTER TABLE clauses ADD COLUMN document_type TEXT NOT NULL DEFAULT 'will';

CREATE INDEX idx_clauses_document_type ON clauses(document_type);
