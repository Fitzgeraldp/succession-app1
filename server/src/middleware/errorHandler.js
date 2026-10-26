function errorHandler(err, req, res, next) {
  // Errors that carry a 4xx status (e.g. malformed JSON from express.json())
  // are the caller's fault — pass that status through instead of a 500.
  const status = err.status >= 400 && err.status < 500 ? err.status : 500
  if (status === 500) console.error(err)
  res.status(status).json({
    error: status === 500 ? 'Internal server error' : 'Bad request',
    details: err.message
  })
}

module.exports = errorHandler
