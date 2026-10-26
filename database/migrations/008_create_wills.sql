CREATE TABLE wills (
  will_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  client_id UUID REFERENCES clients(client_id) ON DELETE CASCADE,
  generated_document TEXT,
  status TEXT DEFAULT 'draft',
  generated_at TIMESTAMP DEFAULT now(),
  reviewed_by UUID REFERENCES lawyers(lawyer_id),
  reviewed_at TIMESTAMP
);
