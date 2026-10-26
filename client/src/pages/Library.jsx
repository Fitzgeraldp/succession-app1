import { Link } from 'react-router-dom'
import './Homepage.css'

// Add each resource here — the page below just maps over this array, so
// this is the only part you need to touch to add content. `tag` is a short
// label like 'Guide', 'Explainer', or 'Checklist'.
const LIBRARY_ITEMS = [
  {
    title: 'Title goes here',
    desc: 'Short description goes here.',
    tag: 'Guide'
  }
]

function Library() {
  return (
    <div className="sr-wrap">
      <Link to="/" className="sr-back-link">&larr; Back to the Succession Register</Link>
      <h1 className="sr-title">Library</h1>
      <p className="sr-lede">
        Background reading on the roles and decisions a will, power of attorney, or
        probate application puts in place.
      </p>

      <div className="sr-panel">
        <ul className="sr-res-list">
          {LIBRARY_ITEMS.map((item, i) => (
            <li key={i}>
              <div>
                <div className="sr-res-title">{item.title}</div>
                <div className="sr-res-desc">{item.desc}</div>
              </div>
              <span className="sr-res-tag">{item.tag}</span>
            </li>
          ))}
        </ul>
      </div>

      <footer className="sr-footer">
        <span>The Succession Register — a record kept for you, not sold to anyone else.</span>
        <span>Not a substitute for independent legal advice.</span>
      </footer>
    </div>
  )
}

export default Library
