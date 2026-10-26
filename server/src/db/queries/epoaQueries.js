const pool = require('../pool')

async function createEpoa(clientId, documentText) {
  const { rows } = await pool.query(
    `INSERT INTO epoas (client_id, generated_document, status)
     VALUES ($1, $2, 'draft') RETURNING *`,
    [clientId, documentText]
  )
  return rows[0]
}

module.exports = { createEpoa }
