import { Link } from 'react-router-dom'
import './Homepage.css'

// Add each question/answer pair here — the page below just maps over this
// array, so this is the only part you need to touch to add content.
const FAQS = [
  {
    q: 'Question goes here?',
    a: 'Answer goes here.'
  }
]

function FAQs() {
  return (
    <div className="sr-wrap">
      <Link to="/" className="sr-back-link">&larr; Back to the Succession Register</Link>
      <h1 className="sr-title">Frequently asked questions</h1>
      <p className="sr-lede">
        Answers to common questions about wills, powers of attorney, and probate.
      </p>

      <div className="sr-panel">
        {FAQS.map((item, i) => (
          <details key={i} open={i === 0}>
            <summary>{item.q}</summary>
            <p>{item.a}</p>
          </details>
        ))}
      </div>

      <footer className="sr-footer">
        <span>The Succession Register — a record kept for you, not sold to anyone else.</span>
        <span>Not a substitute for independent legal advice.</span>
      </footer>
    </div>
  )
}

export default FAQs
