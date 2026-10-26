const express = require('express')
const cors = require('cors')

const clientsRoutes = require('./routes/clients.routes')
const questionnaireRoutes = require('./routes/questionnaire.routes')
const partiesRoutes = require('./routes/parties.routes')
const willsRoutes = require('./routes/wills.routes')
const epoaRoutes = require('./routes/epoa.routes')
const authRoutes = require('./routes/auth.routes')
const requireAuth = require('./middleware/authMiddleware')
const errorHandler = require('./middleware/errorHandler')

const app = express()

app.use(cors())
app.use(express.json())

// Registration/login stay public; everything else requires a logged-in lawyer.
app.use('/api/auth', authRoutes)
app.use('/api/clients', requireAuth, clientsRoutes)
app.use('/api/questionnaire', requireAuth, questionnaireRoutes)
app.use('/api/parties', requireAuth, partiesRoutes)
app.use('/api/wills', requireAuth, willsRoutes)
app.use('/api/epoa', requireAuth, epoaRoutes)

app.get('/api/health', (req, res) => res.json({ status: 'ok' }))

app.use(errorHandler)

module.exports = app
