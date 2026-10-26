CREATE TABLE clients (
  client_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  lawyer_id UUID REFERENCES lawyers(lawyer_id),
  full_name TEXT NOT NULL,
  date_of_birth DATE,
  address TEXT,
  jurisdiction TEXT NOT NULL,
  marital_status TEXT,
  created_at TIMESTAMP DEFAULT now()
);
