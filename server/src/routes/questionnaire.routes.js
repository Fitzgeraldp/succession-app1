const express = require('express')
const router = express.Router()
const { saveQuestionnaireResponses } = require('../db/queries/clientQueries')

router.post('/:clientId/responses', async (req, res, next) => {
  try {
    await saveQuestionnaireResponses(req.params.clientId, req.body.answers)
    res.json({ status: 'saved' })
  } catch (err) {
    next(err)
  }
})

module.exports = router
