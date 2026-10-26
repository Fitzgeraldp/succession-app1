const { findMatchingClauses } = require('../db/queries/clauseQueries')

// Evaluates which clauses apply for a given client's jurisdiction, document
// type ('will' or 'epoa'), and answers
async function matchClauses(jurisdiction, documentType, answers) {
  return await findMatchingClauses(jurisdiction, documentType, answers)
}

module.exports = { matchClauses }
