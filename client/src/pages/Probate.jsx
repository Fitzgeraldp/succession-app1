import { Link } from 'react-router-dom'
import './Homepage.css'

const KEY_TERMS = [
  { term: 'Grant of Probate', meaning: "Court order confirming the will's validity and the executor's authority" },
  { term: 'Letters of Administration', meaning: 'Granted when there’s no will (intestacy), or no executor able/willing to act' },
  { term: 'Executor', meaning: 'Person named in the will to administer the estate' },
  { term: 'Administrator', meaning: 'Court-appointed person when there’s no valid will' },
  { term: 'Intestate', meaning: 'Died without a valid will' },
  { term: 'Estate', meaning: 'All assets and liabilities left behind' },
  { term: 'Beneficiary', meaning: 'Person entitled to a share of the estate' }
]

const PROCESS_STEPS = [
  'Locate the will and confirm the named executor',
  'Apply for a Grant of Probate — filed with the Supreme Court in the relevant state, including a copy of the will, death certificate, and an inventory/estimate of assets',
  'Publish a notice of intention to apply — usually online via each state’s probate notice service, giving creditors/interested parties a chance to object',
  'Court issues the Grant — this legally empowers the executor to deal with banks, land titles offices, etc.',
  'Call in assets & pay debts — including any outstanding tax',
  'Distribute the estate — according to the will, or intestacy rules if there’s none',
  'Final accounting — executor may need to provide accounts to beneficiaries, though formal court sign-off isn’t always required unless disputed'
]

const BYPASS_PROBATE = [
  'Jointly owned property (joint tenancy) — passes automatically to the surviving joint owner, outside the estate',
  'Superannuation with a valid binding death benefit nomination — paid directly to the nominated beneficiary, not through probate',
  'Life insurance with a named beneficiary',
  'Small/simple estates — some banks and institutions release modest funds without a formal grant if amounts are low'
]

const JURISDICTIONS = [
  'New South Wales', 'Victoria', 'Queensland', 'Western Australia',
  'South Australia', 'Tasmania', 'Australian Capital Territory', 'Northern Territory'
]

function Probate() {
  return (
    <div className="sr-wrap">
      <Link to="/" className="sr-back-link">&larr; Back to the Succession Register</Link>
      <h1 className="sr-title">Probate</h1>
      <p className="sr-lede">
        Probate is a grant issued by the Supreme Court of the relevant state or territory,
        confirming that the deceased's will is valid and that the named executor has legal
        authority to administer the estate. If there's no will, the process is called obtaining
        Letters of Administration instead, and the person administering the estate is the
        administrator (rather than executor).
      </p>

      <div className="sr-panel">
        <h2>Key terms</h2>
        <dl className="sr-def-list">
          {KEY_TERMS.map(({ term, meaning }) => (
            <div key={term} style={{ display: 'contents' }}>
              <dt>{term}</dt>
              <dd>{meaning}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="sr-panel">
        <h2>State and territory jurisdiction</h2>
        <p className="sr-lede">
          Each state and territory has its own Supreme Court probate registry and slightly
          different rules and forms. Probate obtained in one state generally needs to be
          "resealed" in another state if the deceased held assets there.
        </p>
        <ul className="sr-res-list">
          {JURISDICTIONS.map(j => <li key={j}><div>{j}</div></li>)}
        </ul>
      </div>

      <div className="sr-panel">
        <h2>Typical process</h2>
        <ol className="sr-steps">
          {PROCESS_STEPS.map((step, i) => (
            <li key={i}><div className="sr-step-desc">{step}</div></li>
          ))}
        </ol>
        <p className="sr-note-line">
          Timeframe: commonly 6–12 months, sometimes longer if the estate is complex, contested,
          or assets are overseas.
        </p>
      </div>

      <div className="sr-panel">
        <h2>Intestacy (no will)</h2>
        <p className="sr-lede">
          Each state has its own intestacy formula, but broadly: a spouse/de facto partner and
          children share the estate according to a statutory formula (the spouse often gets a
          set amount first, plus a share of the remainder). If there's no spouse or children, it
          passes to parents, then siblings, then more distant relatives. If no relatives can be
          found, the estate can pass to the state government (bona vacantia).
        </p>
      </div>

      <div className="sr-panel">
        <h2>No inheritance or estate tax</h2>
        <p className="sr-lede">
          Unlike some countries, Australia does not have inheritance tax or estate tax. However,
          Capital Gains Tax (CGT) may apply later if beneficiaries sell inherited assets (with
          some exemptions, e.g. the main residence), the estate itself may still need to lodge a
          final income tax return (and possibly a "date of death" and "trust" tax return if
          income is earned during administration), and superannuation death benefits have their
          own tax treatment, separate from probate, often paid outside the estate depending on
          nomination.
        </p>
      </div>

      <div className="sr-panel">
        <h2>What can bypass probate</h2>
        <ul className="sr-steps">
          {BYPASS_PROBATE.map((item, i) => <li key={i}><div className="sr-step-desc">{item}</div></li>)}
        </ul>
      </div>

      <div className="sr-panel">
        <h2>Family provision claims</h2>
        <p className="sr-lede">
          A distinctive feature of Australian succession law: eligible people (spouse, children,
          and in some states other dependents) who feel they weren't adequately provided for can
          make a family provision claim against the estate, asking the court to award them a
          share or a larger share — even if a valid will exists and technically excludes them.
          Time limits apply (often 6–12 months from death, varying by state), and this is a
          significant point of estate litigation in Australia.
        </p>
      </div>

      <footer className="sr-footer">
        <span>The Succession Register — a record kept for you, not sold to anyone else.</span>
        <span>Not a substitute for independent legal advice.</span>
      </footer>
    </div>
  )
}

export default Probate
