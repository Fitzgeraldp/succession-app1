CREATE TABLE clauses (
  clause_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  clause_key TEXT NOT NULL,
  jurisdiction TEXT NOT NULL,
  clause_title TEXT,
  clause_text TEXT NOT NULL,
  version INT DEFAULT 1,
  is_active BOOLEAN DEFAULT true,
  last_reviewed_date DATE,
  created_at TIMESTAMP DEFAULT now()
);
