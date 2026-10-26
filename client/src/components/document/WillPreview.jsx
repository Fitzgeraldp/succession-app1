function WillPreview({ will }) {
  return (
    <div style={{ marginTop: '2rem', padding: '1rem', border: '1px solid #ccc' }}>
      <h2>Draft Will Preview</h2>
      <pre style={{ whiteSpace: 'pre-wrap' }}>{will.generated_document}</pre>
      <p><em>Status: {will.status} — requires solicitor review before execution.</em></p>
    </div>
  )
}

export default WillPreview
