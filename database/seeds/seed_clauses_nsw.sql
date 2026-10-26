-- Seed data: sample NSW clause library
-- These are illustrative templates only — must be reviewed by a solicitor before use

INSERT INTO clauses (clause_id, clause_key, jurisdiction, clause_title, clause_text, sort_order, last_reviewed_date) VALUES
(uuid_generate_v4(), 'revocation', 'NSW', 'Revocation of Prior Wills',
 'I, {{full_name}}, of {{address}}, revoke all former wills and testamentary dispositions made by me and declare this to be my last will.',
 10, CURRENT_DATE),

(uuid_generate_v4(), 'executor_appointment', 'NSW', 'Appointment of Executor',
 'I appoint {{executor_name}} to be the executor and trustee of this my will. If {{executor_name}} is unable or unwilling to act, I appoint {{alternate_executor_name}} in their place.',
 20, CURRENT_DATE),

(uuid_generate_v4(), 'guardian_appointment', 'NSW', 'Appointment of Guardian',
 'If at my death any of my children are under the age of 18 years, I appoint {{guardian_name}} to be the guardian of my infant children. If {{guardian_name}} is unable or unwilling to act, I appoint {{alternate_guardian_name}} in their place.',
 30, CURRENT_DATE),

(uuid_generate_v4(), 'residuary_estate', 'NSW', 'Residuary Estate',
 'I give the whole of the residue of my estate to {{residuary_beneficiary}}.',
 40, CURRENT_DATE),

(uuid_generate_v4(), 'survivorship_clause', 'NSW', 'Survivorship Requirement',
 'No person shall be deemed to have survived me unless that person survives me by 30 days.',
 50, CURRENT_DATE);

-- Example conditional rules linking clauses to questionnaire answers
-- Run this AFTER confirming actual clause_id values, or adapt to use clause_key lookups in application code
