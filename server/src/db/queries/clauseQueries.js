const pool = require('../pool')

// Finds all clauses whose rule conditions are satisfied by the given answers
// answers: object like { hasMinorChildren: 'true', jurisdiction: 'NSW' }
// documentType: 'will' or 'epoa' — the clauses/clause_rules tables are shared
// across document types, distinguished by clauses.document_type
async function findMatchingClauses(jurisdiction, documentType, answers) {
  const { rows } = await pool.query(
    `SELECT c.clause_id, c.clause_key, c.clause_title, c.clause_text, c.sort_order,
            r.condition_question_key, r.condition_operator, r.condition_value
     FROM clauses c
     LEFT JOIN clause_rules r ON r.clause_id = c.clause_id
     WHERE c.jurisdiction = $1 AND c.document_type = $2 AND c.is_active = true
     ORDER BY c.sort_order ASC`,
    [jurisdiction, documentType]
  )

  // Group rules by clause, then filter to only clauses whose rules all pass
  // (a clause with NO rules is always included — treat as unconditional)
  const clauseMap = new Map()

  for (const row of rows) {
    if (!clauseMap.has(row.clause_id)) {
      clauseMap.set(row.clause_id, {
        clause_id: row.clause_id,
        clause_key: row.clause_key,
        clause_title: row.clause_title,
        clause_text: row.clause_text,
        rules: []
      })
    }
    if (row.condition_question_key) {
      clauseMap.get(row.clause_id).rules.push({
        question_key: row.condition_question_key,
        operator: row.condition_operator,
        value: row.condition_value
      })
    }
  }

  const matched = []
  for (const clause of clauseMap.values()) {
    const allRulesPass = clause.rules.every(rule => evaluateRule(rule, answers))
    if (allRulesPass) matched.push(clause)
  }

  return matched
}

function evaluateRule(rule, answers) {
  const actualValue = answers[rule.question_key]
  if (actualValue === undefined) return false

  switch (rule.operator) {
    case 'equals':
      return String(actualValue) === String(rule.value)
    case 'not_equals':
      return String(actualValue) !== String(rule.value)
    case 'greater_than':
      return Number(actualValue) > Number(rule.value)
    case 'contains':
      return String(actualValue).includes(rule.value)
    default:
      return false
  }
}

module.exports = { findMatchingClauses }
