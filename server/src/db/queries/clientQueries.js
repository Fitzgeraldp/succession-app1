const pool = require('../pool')

async function createClient({ lawyerId, fullName, dateOfBirth, address, jurisdiction, maritalStatus }) {
  const { rows } = await pool.query(
    `INSERT INTO clients (lawyer_id, full_name, date_of_birth, address, jurisdiction, marital_status)
     VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
    [lawyerId, fullName, dateOfBirth, address, jurisdiction, maritalStatus]
  )
  return rows[0]
}

async function getClientById(clientId) {
  const { rows } = await pool.query('SELECT * FROM clients WHERE client_id = $1', [clientId])
  return rows[0]
}

async function saveQuestionnaireResponses(clientId, answers) {
  const inserts = Object.entries(answers).map(([key, value]) =>
    pool.query(
      `INSERT INTO questionnaire_responses (client_id, question_key, response_value)
       VALUES ($1, $2, $3)`,
      [clientId, key, String(value)]
    )
  )
  await Promise.all(inserts)
}

module.exports = { createClient, getClientById, saveQuestionnaireResponses }
