CREATE TABLE questionnaire_responses (
  response_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  client_id UUID REFERENCES clients(client_id) ON DELETE CASCADE,
  question_key TEXT NOT NULL,
  response_value TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT now()
);
