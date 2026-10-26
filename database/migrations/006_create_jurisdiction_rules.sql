CREATE TABLE jurisdiction_rules (
  jurisdiction TEXT PRIMARY KEY,
  min_witnesses INT DEFAULT 2,
  allows_electronic_execution BOOLEAN DEFAULT false,
  family_provision_act_reference TEXT,
  notes TEXT
);
