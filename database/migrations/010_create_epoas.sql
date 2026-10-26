-- Generated enduring powers of attorney (audit trail — never overwrite, always insert new)
-- Mirrors the wills table structure.
CREATE TABLE epoas (
  epoa_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  client_id UUID REFERENCES clients(client_id) ON DELETE CASCADE,
  generated_document TEXT,
  status TEXT DEFAULT 'draft', -- 'draft', 'reviewed', 'executed'
  generated_at TIMESTAMP DEFAULT now(),
  reviewed_by UUID REFERENCES lawyers(lawyer_id),
  reviewed_at TIMESTAMP
);

CREATE INDEX idx_epoas_client ON epoas(client_id);
