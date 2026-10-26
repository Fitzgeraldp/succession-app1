const express = require('express')
const router = express.Router()
const { createClient, getClientById } = require('../db/queries/clientQueries')

router.post('/', async (req, res, next) => {
  try {
    // Link the client to the logged-in lawyer (set by requireAuth).
    const client = await createClient({ ...req.body, lawyerId: req.lawyerId })
    res.status(201).json(client)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const client = await getClientById(req.params.id)
    if (!client) return res.status(404).json({ error: 'Client not found' })
    res.json(client)
  } catch (err) {
    next(err)
  }
})

module.exports = router
