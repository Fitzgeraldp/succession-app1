const pool = require('../db/pool')
const { getClientById, saveQuestionnaireResponses } = require('../db/queries/clientQueries')
const { matchClauses } = require('../services/clauseMatchingService')
const { assembleDocument } = require('../services/documentAssemblyService')

async function generateWill(req, res, next) {
  try {
    const { clientId, answers, placeholderData } = req.body

    const client = await getClientById(clientId)
    if (!client) return res.status(404).json({ error: 'Client not found' })

    await saveQuestionnaireResponses(clientId, answers)

    const clauses = await matchClauses(client.jurisdiction, 'will', answers)
    const documentText = assembleDocument(clauses, placeholderData || {})

    const { rows } = await pool.query(
      `INSERT INTO wills (client_id, generated_document, status)
       VALUES ($1, $2, 'draft') RETURNING *`,
      [clientId, documentText]
    )

    res.json({ will: rows[0], clausesUsed: clauses.map(c => c.clause_key) })
  } catch (err) {
    next(err)
  }
}

module.exports = { generateWill }
