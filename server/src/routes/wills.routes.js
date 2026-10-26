const express = require('express')
const router = express.Router()
const { generateWill } = require('../controllers/willGenerationController')

router.post('/generate', generateWill)

module.exports = router
