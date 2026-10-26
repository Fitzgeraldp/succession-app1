import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { login, register, isLoggedIn } from '../api/client'
import './Homepage.css'

const TABS = [
  { id: 'questionnaire', label: 'Questionnaire' },
  { id: 'jurisdiction', label: 'Jurisdiction' },
  { id: 'account', label: 'Login & account' },
  { id: 'create', label: 'Create a will' },
  { id: 'epoa', label: 'Power of attorney' },
  { id: 'resources', label: 'Resources' },
  { id: 'faq', label: 'FAQ' }
]

const JURISDICTIONS = [
  {
    value: 'nsw',
    label: 'New South Wales',
    note: 'Wills must be signed in the presence of two witnesses, neither of whom can be a beneficiary. De facto partners of two years or more are treated the same as spouses under intestacy rules.'
  },
  {
    value: 'vic',
    label: 'Victoria',
    note: 'Two witnesses are required, and a will can be made from age 18 (or younger with court approval). Registered domestic partners are recognised alongside married spouses.'
  },
  {
    value: 'qld',
    label: 'Queensland',
    note: 'Requires two witnesses present at signing. De facto relationships of two years or more, or with a child together, carry the same recognition as marriage.'
  },
  {
    value: 'wa',
    label: 'Western Australia',
    note: 'Two witnesses are required. Courts can recognise informal or unsigned documents as a will in limited circumstances if intent is clear.'
  },
  {
    value: 'sa',
    label: 'South Australia',
    note: 'Two witnesses are required at signing. Domestic partners of three years or more (or with a child) are treated as spouses under intestacy law.'
  },
  {
    value: 'tas',
    label: 'Tasmania',
    note: 'Requires two witnesses. A significant relationship, once registered or established for four years, is recognised the same as marriage.'
  },
  {
    value: 'act',
    label: 'Australian Capital Territory',
    note: 'Two witnesses are required. Domestic partnerships, registered or de facto, are recognised alongside marriage.'
  },
  {
    value: 'nt',
    label: 'Northern Territory',
    note: 'Requires two witnesses present at signing. De facto partners of two years or more are recognised the same as spouses.'
  }
]

const RESOURCES = [
  {
    title: 'What an executor actually does',
    desc: 'The duties involved in administering an estate, and how to choose someone for the role.',
    tag: 'Guide'
  },
  {
    title: 'Naming a guardian for your children',
    desc: 'How guardianship works, and what to discuss with the person you have in mind.',
    tag: 'Guide'
  },
  {
    title: "Dying without a will",
    desc: "How intestacy rules decide who inherits when there's no valid will in place.",
    tag: 'Explainer'
  },
  {
    title: 'When to update your will',
    desc: 'Marriage, separation, new children, and other events that call for a review.',
    tag: 'Checklist'
  },
  {
    title: 'Will vs. enduring power of attorney',
    desc: 'Why these are separate documents, and what each one actually controls.',
    tag: 'Explainer'
  }
]

const FAQS = [
  {
    q: 'Is a will I draft here legally valid?',
    a: "Your draft becomes legally valid once it is signed and witnessed according to the rules in your jurisdiction. We'll show you those requirements once you select your state or territory."
  },
  {
    q: "Can I change my will after it's created?",
    a: 'Yes. You can return to your account at any time to update your answers and generate a new draft. Only your most recently signed version is valid.'
  },
  {
    q: "What happens if I don't name a guardian?",
    a: "If you have children under 18 and haven't named a guardian, a court will decide who takes on that role, which may not match your wishes."
  },
  {
    q: 'Do my witnesses need to be present in person?',
    a: 'In most jurisdictions, yes — witnessing requirements vary by state and territory, and are listed on the jurisdiction tab.'
  }
]

const STEPS = [
  { title: 'Tell us about you', desc: 'Name, date of birth, marital status, and address.' },
  { title: 'Name the people involved', desc: 'Beneficiaries, your executor, and a guardian if you have children under 18.' },
  { title: 'Add any instructions', desc: 'Specific gifts, funeral wishes, or anything else you want recorded.' },
  { title: 'Review your draft', desc: 'We generate a draft will from your answers for you to check.' }
]

const EPOA_STEPS = [
  { title: 'Tell us about you', desc: 'Name, date of birth, and address.' },
  { title: 'Choose your attorney', desc: 'Who should act for you, and whether an alternate or additional attorney is needed.' },
  { title: 'Set the scope', desc: 'Financial matters, personal and health matters, or both — plus any restrictions.' },
  { title: 'Decide when it starts', desc: 'Immediately, or only if you lose the capacity to make your own decisions.' }
]

function Wills({ fileRef = 'No. 2026 – 0417' }) {
  const [activeTab, setActiveTab] = useState('questionnaire')
  const [jurisdiction, setJurisdiction] = useState('nsw')
  const navigate = useNavigate()

  const [accountFields, setAccountFields] = useState({ fullName: '', email: '', password: '' })
  const [accountStatus, setAccountStatus] = useState(null) // { message, isError }
  const [loggedIn, setLoggedIn] = useState(isLoggedIn())
  const updateAccountField = (key, value) => setAccountFields({ ...accountFields, [key]: value })

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      await login(accountFields.email, accountFields.password)
      setLoggedIn(true)
      setAccountStatus({ message: "You're logged in.", isError: false })
    } catch (err) {
      setAccountStatus({ message: err.message, isError: true })
    }
  }

  const handleCreateAccount = async () => {
    try {
      await register(accountFields.fullName, accountFields.email, accountFields.password)
      await login(accountFields.email, accountFields.password)
      setLoggedIn(true)
      setAccountStatus({ message: 'Account created — you\'re logged in.', isError: false })
    } catch (err) {
      setAccountStatus({ message: err.message, isError: true })
    }
  }

  const activeJurisdiction = JURISDICTIONS.find(j => j.value === jurisdiction)

  return (
    <div className="sr-wrap">

      <div className="sr-masthead">
        <div className="sr-masthead-row">
          <div>
            <h1 className="sr-title">The Succession Register</h1>
            <p className="sr-kicker">
              A working record of wills, executors, guardians and estates — kept in order, one entry at a time.
            </p>
          </div>
          <div className="sr-file-ref">
            File opened
            <span className="sr-num">{fileRef}</span>
          </div>
        </div>
      </div>

      <nav className="sr-tabs">
        {TABS.map(tab => (
          <button
            key={tab.id}
            type="button"
            className={`sr-tab${activeTab === tab.id ? ' active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
        <Link to="/probate" className="sr-tab">Probate</Link>
        <Link to="/templates" className="sr-tab">Document templates</Link>
      </nav>

      <div className="sr-ledger">

        {activeTab === 'questionnaire' && (
          <div className="sr-panel">
            <h2>Start with the questionnaire</h2>
            <p className="sr-lede">
              A short set of questions about your circumstances — family, assets, and wishes — becomes the
              basis for your draft will. Nothing here is filed until you choose to submit it.
            </p>
            <ol className="sr-steps">
              {STEPS.map((step, i) => (
                <li key={i}>
                  <div>
                    <div className="sr-step-title">{step.title}</div>
                    <div className="sr-step-desc">{step.desc}</div>
                  </div>
                </li>
              ))}
            </ol>
            <button type="button" className="sr-btn" onClick={() => navigate('/questionnaire')}>
              Begin the questionnaire
            </button>
          </div>
        )}

        {activeTab === 'jurisdiction' && (
          <div className="sr-panel">
            <h2>Choose your jurisdiction</h2>
            <p className="sr-lede">
              Succession law is set at the state and territory level. Requirements for witnesses, de facto
              and same-sex partners, and intestacy differ by jurisdiction — select yours to see what applies.
            </p>
            <div className="sr-juris-grid">
              <div className="sr-field" style={{ marginBottom: 0 }}>
                <label htmlFor="juris-select">State or territory</label>
                <select
                  id="juris-select"
                  value={jurisdiction}
                  onChange={e => setJurisdiction(e.target.value)}
                >
                  {JURISDICTIONS.map(j => (
                    <option key={j.value} value={j.value}>{j.label}</option>
                  ))}
                </select>
              </div>
              <div className="sr-juris-note">
                <strong>{activeJurisdiction.label}.</strong> {activeJurisdiction.note}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'account' && (
          <div className="sr-panel">
            <h2>Log in to your account</h2>
            {loggedIn ? (
              <p className="sr-lede">You're logged in. All actions below now run as you.</p>
            ) : (
              <p className="sr-lede">
                Return to a saved questionnaire, download a previous draft, or update your details.
                New here? Fill in your name too and use "Create an account".
              </p>
            )}
            <form onSubmit={handleLogin}>
              <div className="sr-field">
                <label htmlFor="sr-name">Full name (for creating an account)</label>
                <input
                  type="text"
                  id="sr-name"
                  placeholder="Jane Smith"
                  value={accountFields.fullName}
                  onChange={e => updateAccountField('fullName', e.target.value)}
                />
              </div>
              <div className="sr-field">
                <label htmlFor="sr-email">Email address</label>
                <input
                  type="email"
                  id="sr-email"
                  placeholder="you@example.com"
                  value={accountFields.email}
                  onChange={e => updateAccountField('email', e.target.value)}
                  required
                />
              </div>
              <div className="sr-field">
                <label htmlFor="sr-password">Password</label>
                <input
                  type="password"
                  id="sr-password"
                  placeholder="••••••••"
                  value={accountFields.password}
                  onChange={e => updateAccountField('password', e.target.value)}
                  required
                />
              </div>
              <button className="sr-btn" type="submit">Log in</button>
              <button
                className="sr-btn sr-btn-ghost"
                type="button"
                style={{ marginLeft: 10 }}
                onClick={handleCreateAccount}
              >
                Create an account
              </button>
              {accountStatus && (
                <p className="sr-note-line" style={{ color: accountStatus.isError ? '#a33' : '#2a7' }}>
                  {accountStatus.message}
                </p>
              )}
            </form>
          </div>
        )}

        {activeTab === 'create' && (
          <div className="sr-panel">
            <h2>Create a will</h2>
            <p className="sr-lede">
              Drafting a will records who receives your assets, who carries out your wishes, and who cares
              for any children under 18. Most people finish the questionnaire in under twenty minutes.
            </p>
            <p className="sr-note-line">
              You'll need: the full names and addresses of your beneficiaries and executor, and (if
              relevant) a proposed guardian for minor children.
            </p>
            <button type="button" className="sr-btn" onClick={() => navigate('/questionnaire')}>
              Start drafting
            </button>
          </div>
        )}

        {activeTab === 'epoa' && (
          <div className="sr-panel">
            <h2>Set up an enduring power of attorney</h2>
            <p className="sr-lede">
              An enduring power of attorney appoints someone to make financial or personal decisions on
              your behalf if you're ever unable to make them yourself. It's a separate document from your
              will — it applies while you're alive, not after.
            </p>
            <ol className="sr-steps">
              {EPOA_STEPS.map((step, i) => (
                <li key={i}>
                  <div>
                    <div className="sr-step-title">{step.title}</div>
                    <div className="sr-step-desc">{step.desc}</div>
                  </div>
                </li>
              ))}
            </ol>
            <button type="button" className="sr-btn" onClick={() => navigate('/epoa')}>
              Begin the EPOA questionnaire
            </button>
          </div>
        )}

        {activeTab === 'resources' && (
          <div className="sr-panel">
            <h2>Resources</h2>
            <p className="sr-lede">Background reading on the roles and decisions a will puts in place.</p>
            <ul className="sr-res-list">
              {RESOURCES.map((r, i) => (
                <li key={i}>
                  <div>
                    <div className="sr-res-title">{r.title}</div>
                    <div className="sr-res-desc">{r.desc}</div>
                  </div>
                  <span className="sr-res-tag">{r.tag}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {activeTab === 'faq' && (
          <div className="sr-panel">
            <h2>Frequently asked questions</h2>
            <p className="sr-lede">
              If your question isn't answered here, our resources page goes into more detail.
            </p>
            {FAQS.map((item, i) => (
              <details key={i} open={i === 0}>
                <summary>{item.q}</summary>
                <p>{item.a}</p>
              </details>
            ))}
          </div>
        )}

      </div>

      <footer className="sr-footer">
        <span>The Succession Register — a record kept for you, not sold to anyone else.</span>
        <span>Not a substitute for independent legal advice.</span>
      </footer>

    </div>
  )
}

export default Wills
