// Fills {{placeholder}} tokens in clause text using data from parties/client answers
function fillPlaceholders(clauseText, data) {
  return clauseText.replace(/{{(.*?)}}/g, (match, key) => {
    const trimmedKey = key.trim()
    return data[trimmedKey] !== undefined ? data[trimmedKey] : match
  })
}

// Assembles the final document text from an ordered list of matched clauses
function assembleDocument(clauses, placeholderData) {
  return clauses
    .map(clause => fillPlaceholders(clause.clause_text, placeholderData))
    .join('\n\n')
}

module.exports = { fillPlaceholders, assembleDocument }
