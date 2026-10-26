function EpoaPreview({ epoa }) {
  return (
    <div style={{ marginTop: '2rem', padding: '1rem', border: '1px solid #ccc' }}>
      <h2>Draft EPOA Preview</h2>
      <pre style={{ whiteSpace: 'pre-wrap' }}>{epoa.generated_document}</pre>
      <p><em>Status: {epoa.status} — requires solicitor review before execution.</em></p>
    </div>
  )
}

export default EpoaPreview
