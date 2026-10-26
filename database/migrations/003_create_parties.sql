CREATE TABLE parties (
  party_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  client_id UUID REFERENCES clients(client_id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  relationship TEXT,
  role TEXT NOT NULL,
  is_primary BOOLEAN DEFAULT true,
  substitute_for UUID REFERENCES parties(party_id),
  share_percentage NUMERIC,
  specific_gift TEXT,
  created_at TIMESTAMP DEFAULT now()
);
