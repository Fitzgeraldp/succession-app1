const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const pool = require('../db/pool')

router.post('/register', async (req, res, next) => {
  try {
    const { fullName, email, password } = req.body
    const passwordHash = await bcrypt.hash(password, 10)
    const { rows } = await pool.query(
      `INSERT INTO lawyers (full_name, email, password_hash) VALUES ($1, $2, $3) RETURNING lawyer_id, full_name, email`,
      [fullName, email, passwordHash]
    )
    res.status(201).json(rows[0])
  } catch (err) {
    next(err)
  }
})

router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body
    const { rows } = await pool.query('SELECT * FROM lawyers WHERE email = $1', [email])
    const lawyer = rows[0]
    if (!lawyer || !(await bcrypt.compare(password, lawyer.password_hash))) {
      return res.status(401).json({ error: 'Invalid credentials' })
    }
    const token = jwt.sign({ lawyerId: lawyer.lawyer_id }, process.env.JWT_SECRET, { expiresIn: '8h' })
    res.json({ token })
  } catch (err) {
    next(err)
  }
})

module.exports = router
