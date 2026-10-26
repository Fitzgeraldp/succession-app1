-- Requires the uuid-ossp extension for uuid_generate_v4() (schema.sql creates
-- this too, so it's a no-op there; needed here since this file can be run on
-- its own).
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE lawyers (
  lawyer_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  full_name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT now()
);
