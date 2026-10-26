-- Seed data: sample NSW enduring power of attorney (EPOA) clause library
-- These are illustrative templates only — must be reviewed by a solicitor before use
--
-- Clause UUIDs are hardcoded (rather than uuid_generate_v4()) so this file can
-- link clause_rules to the right clause without a lookup step.

INSERT INTO clauses (clause_id, clause_key, jurisdiction, document_type, clause_title, clause_text, sort_order, last_reviewed_date) VALUES
('a1b2c3d4-0001-4000-8000-000000000009', 'epoa_revocation', 'NSW', 'epoa', 'Revocation of Prior Powers of Attorney',
 'I revoke all former enduring powers of attorney made by me.',
 10, CURRENT_DATE),

('a1b2c3d4-0001-4000-8000-000000000001', 'epoa_appointment', 'NSW', 'epoa', 'Appointment of Attorney',
 'I, {{full_name}}, of {{address}}, appoint {{attorney_name}} to be my attorney under this enduring power of attorney.',
 20, CURRENT_DATE),

('a1b2c3d4-0001-4000-8000-000000000002', 'epoa_additional_attorney', 'NSW', 'epoa', 'Appointment of Additional Attorney',
 'I additionally appoint {{additional_attorney_name}} to act as my attorney. My attorneys are to act {{attorney_acting}}.',
 30, CURRENT_DATE),

('a1b2c3d4-0001-4000-8000-000000000003', 'epoa_alternate_attorney', 'NSW', 'epoa', 'Appointment of Alternate Attorney',
 'If my attorney(s) named above are unable or unwilling to act, I appoint {{alternate_attorney_name}} as my alternate attorney.',
 40, CURRENT_DATE),

('a1b2c3d4-0001-4000-8000-000000000004', 'epoa_scope', 'NSW', 'epoa', 'Scope of Authority',
 'This power of attorney authorises my attorney to act on my behalf in respect of the following matters: {{scope}}.',
 50, CURRENT_DATE),

('a1b2c3d4-0001-4000-8000-000000000005', 'epoa_restrictions', 'NSW', 'epoa', 'Restrictions on Authority',
 'My attorney''s authority under this power of attorney is subject to the following restriction(s): {{restrictions}}.',
 60, CURRENT_DATE),

('a1b2c3d4-0001-4000-8000-000000000006', 'epoa_gifts', 'NSW', 'epoa', 'Authority to Make Gifts',
 'My attorney may make gifts of my property on my behalf in accordance with the following instructions: {{gift_instructions}}.',
 70, CURRENT_DATE),

('a1b2c3d4-0001-4000-8000-000000000007', 'epoa_effective_immediate', 'NSW', 'epoa', 'Commencement — Immediate',
 'This enduring power of attorney takes effect immediately upon execution.',
 80, CURRENT_DATE),

('a1b2c3d4-0001-4000-8000-000000000008', 'epoa_effective_incapacity', 'NSW', 'epoa', 'Commencement — On Incapacity',
 'This enduring power of attorney takes effect only if and when I lose the capacity to make my own financial, personal or health decisions, as certified by a registered medical practitioner.',
 80, CURRENT_DATE);

-- Conditional rules linking clauses to questionnaire answers.
-- A clause with no rule row is always included (see epoa_appointment/epoa_scope above).
INSERT INTO clause_rules (clause_id, condition_question_key, condition_operator, condition_value) VALUES
('a1b2c3d4-0001-4000-8000-000000000002', 'hasAdditionalAttorney', 'equals', 'true'),
('a1b2c3d4-0001-4000-8000-000000000003', 'hasAlternateAttorney', 'equals', 'true'),
('a1b2c3d4-0001-4000-8000-000000000005', 'restrictions', 'not_equals', ''),
('a1b2c3d4-0001-4000-8000-000000000006', 'allowGifts', 'equals', 'true'),
('a1b2c3d4-0001-4000-8000-000000000007', 'effectiveWhen', 'equals', 'immediately'),
('a1b2c3d4-0001-4000-8000-000000000008', 'effectiveWhen', 'equals', 'onIncapacity'),
('a1b2c3d4-0001-4000-8000-000000000009', 'revokesPrevious', 'equals', 'true');
