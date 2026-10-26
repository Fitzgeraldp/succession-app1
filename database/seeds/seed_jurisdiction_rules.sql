-- Seed data: Australian state/territory execution rules
-- NOTE: verify current rules with a solicitor before relying on these values in production

INSERT INTO jurisdiction_rules (jurisdiction, min_witnesses, allows_electronic_execution, family_provision_act_reference, notes) VALUES
('NSW', 2, true, 'Succession Act 2006 (NSW)', 'Witnesses and their spouses generally cannot be beneficiaries'),
('VIC', 2, true, 'Administration and Probate Act 1958 (VIC)', 'Electronic execution permitted under specific conditions'),
('QLD', 2, false, 'Succession Act 1981 (QLD)', 'Confirm current electronic execution status before relying on this'),
('WA',  2, false, 'Family Provision Act 1972 (WA)', NULL),
('SA',  2, false, 'Inheritance (Family Provision) Act 1972 (SA)', NULL),
('TAS', 2, false, 'Testator''s Family Maintenance Act 1912 (TAS)', NULL),
('ACT', 2, true, 'Family Provision Act 1969 (ACT)', NULL),
('NT',  2, false, 'Family Provision Act 1970 (NT)', NULL);
