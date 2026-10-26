const { getClientById, saveQuestionnaireResponses } = require('../db/queries/clientQueries')
const { createEpoa } = require('../db/queries/epoaQueries')
const { matchClauses } = require('../services/clauseMatchingService')
const { assembleDocument } = require('../services/documentAssemblyService')

async function generateEpoa(req, res, next) {
  try {
    const { clientId, answers, placeholderData } = req.body

    const client = await getClientById(clientId)
    if (!client) return res.status(404).json({ error: 'Client not found' })

    await saveQuestionnaireResponses(clientId, answers)

    const clauses = await matchClauses(client.jurisdiction, 'epoa', answers)
    const documentText = assembleDocument(clauses, placeholderData || {})

    const epoa = await createEpoa(clientId, documentText)

    res.json({ epoa, clausesUsed: clauses.map(c => c.clause_key) })
  } catch (err) {
    next(err)
  }
}

module.exports = { generateEpoa }
