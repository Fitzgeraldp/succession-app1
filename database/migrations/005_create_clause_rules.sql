CREATE TABLE clause_rules (
  rule_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  clause_id UUID REFERENCES clauses(clause_id) ON DELETE CASCADE,
  condition_question_key TEXT NOT NULL,
  condition_operator TEXT NOT NULL,
  condition_value TEXT NOT NULL,
  priority INT DEFAULT 0
);
