const express = require('express')
const router = express.Router()
const pool = require('../db/pool')

router.post('/', async (req, res, next) => {
  try {
    const { clientId, fullName, relationship, role, isPrimary, sharePercentage, specificGift } = req.body
    const { rows } = await pool.query(
      `INSERT INTO parties (client_id, full_name, relationship, role, is_primary, share_percentage, specific_gift)
       VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      [clientId, fullName, relationship, role, isPrimary ?? true, sharePercentage, specificGift]
    )
    res.status(201).json(rows[0])
  } catch (err) {
    next(err)
  }
})

router.get('/client/:clientId', async (req, res, next) => {
  try {
    const { rows } = await pool.query('SELECT * FROM parties WHERE client_id = $1', [req.params.clientId])
    res.json(rows)
  } catch (err) {
    next(err)
  }
})

module.exports = router
