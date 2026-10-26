-- Succession Template Database Schema
-- PostgreSQL

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Lawyers using the system
CREATE TABLE lawyers (
  lawyer_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  full_name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT now()
);

-- Clients (willmakers)
CREATE TABLE clients (
  client_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  lawyer_id UUID REFERENCES lawyers(lawyer_id),
  full_name TEXT NOT NULL,
  date_of_birth DATE,
  address TEXT,
  jurisdiction TEXT NOT NULL, -- 'NSW', 'VIC', 'QLD', etc.
  marital_status TEXT,
  created_at TIMESTAMP DEFAULT now()
);

-- Raw questionnaire answers, one row per question per client
CREATE TABLE questionnaire_responses (
  response_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  client_id UUID REFERENCES clients(client_id) ON DELETE CASCADE,
  question_key TEXT NOT NULL,
  response_value TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT now()
);

-- People named in the will: beneficiaries, executors, guardians, witnesses
CREATE TABLE parties (
  party_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  client_id UUID REFERENCES clients(client_id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  relationship TEXT,
  role TEXT NOT NULL, -- 'beneficiary', 'executor', 'guardian', 'witness'
  is_primary BOOLEAN DEFAULT true,
  substitute_for UUID REFERENCES parties(party_id),
  share_percentage NUMERIC,
  specific_gift TEXT,
  created_at TIMESTAMP DEFAULT now()
);

-- Reusable legal clause text blocks
CREATE TABLE clauses (
  clause_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  clause_key TEXT NOT NULL,
  jurisdiction TEXT NOT NULL,
  document_type TEXT NOT NULL DEFAULT 'will', -- 'will', 'epoa'
  clause_title TEXT,
  clause_text TEXT NOT NULL, -- contains {{placeholder}} tokens
  sort_order INT NOT NULL DEFAULT 0, -- position within the assembled document
  version INT DEFAULT 1,
  is_active BOOLEAN DEFAULT true,
  last_reviewed_date DATE,
  created_at TIMESTAMP DEFAULT now()
);

-- Conditions that determine whether a clause is included
CREATE TABLE clause_rules (
  rule_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  clause_id UUID REFERENCES clauses(clause_id) ON DELETE CASCADE,
  condition_question_key TEXT NOT NULL,
  condition_operator TEXT NOT NULL, -- 'equals', 'not_equals', 'greater_than', 'contains'
  condition_value TEXT NOT NULL,
  priority INT DEFAULT 0
);

-- State/territory-specific execution requirements
CREATE TABLE jurisdiction_rules (
  jurisdiction TEXT PRIMARY KEY,
  min_witnesses INT DEFAULT 2,
  allows_electronic_execution BOOLEAN DEFAULT false,
  family_provision_act_reference TEXT,
  notes TEXT
);

-- Generated wills (audit trail — never overwrite, always insert new)
CREATE TABLE wills (
  will_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  client_id UUID REFERENCES clients(client_id) ON DELETE CASCADE,
  generated_document TEXT,
  status TEXT DEFAULT 'draft', -- 'draft', 'reviewed', 'executed'
  generated_at TIMESTAMP DEFAULT now(),
  reviewed_by UUID REFERENCES lawyers(lawyer_id),
  reviewed_at TIMESTAMP
);

-- Generated enduring powers of attorney (audit trail — never overwrite, always insert new)
CREATE TABLE epoas (
  epoa_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  client_id UUID REFERENCES clients(client_id) ON DELETE CASCADE,
  generated_document TEXT,
  status TEXT DEFAULT 'draft', -- 'draft', 'reviewed', 'executed'
  generated_at TIMESTAMP DEFAULT now(),
  reviewed_by UUID REFERENCES lawyers(lawyer_id),
  reviewed_at TIMESTAMP
);

-- Indexes for common lookups
CREATE INDEX idx_responses_client ON questionnaire_responses(client_id);
CREATE INDEX idx_parties_client ON parties(client_id);
CREATE INDEX idx_clause_rules_clause ON clause_rules(clause_id);
CREATE INDEX idx_clauses_jurisdiction ON clauses(jurisdiction) WHERE is_active = true;
CREATE INDEX idx_clauses_document_type ON clauses(document_type);
CREATE INDEX idx_wills_client ON wills(client_id);
CREATE INDEX idx_epoas_client ON epoas(client_id);
