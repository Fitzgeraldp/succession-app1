const express = require('express')
const router = express.Router()
const { generateEpoa } = require('../controllers/epoaGenerationController')

router.post('/generate', generateEpoa)

module.exports = router
