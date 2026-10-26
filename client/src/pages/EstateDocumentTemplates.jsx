import React, { useState } from "react";

/**
 * EstateDocumentTemplates
 * -----------------------
 * A self-contained React component providing four editable legal
 * correspondence templates: Cover Letter, Last Will and Testament,
 * Enduring Power of Attorney, and Probate Letter.
 *
 * These are structural templates only, not legal advice. Execution
 * and witnessing requirements vary by jurisdiction — have a qualified
 * lawyer review any completed document before it is signed or filed.
 *
 * Usage:
 *   import EstateDocumentTemplates from "./EstateDocumentTemplates";
 *   <EstateDocumentTemplates />
 *
 * No external dependencies required beyond React. Styling is inline
 * so this drops into any app without a stylesheet import.
 */

const TABS = [
  { id: "cover", label: "Cover Letter" },
  { id: "will", label: "Last Will" },
  { id: "epa", label: "Enduring POA" },
  { id: "probate", label: "Probate Letter" },
];

const styles = {
  page: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    background: "#e9e4da",
    padding: "32px 16px 80px",
    fontFamily: "'Helvetica Neue', Arial, sans-serif",
    color: "#201c18",
    minHeight: "100vh",
  },
  header: { width: "100%", maxWidth: 780, marginBottom: 20 },
  h1: {
    fontFamily: "Georgia, 'Iowan Old Style', serif",
    fontWeight: 400,
    fontSize: 28,
    margin: "0 0 4px",
  },
  subtitle: { margin: 0, color: "#8c8375", fontSize: 14, maxWidth: "60ch" },
  tabs: {
    width: "100%",
    maxWidth: 780,
    display: "flex",
    gap: 4,
    marginTop: 22,
    borderBottom: "1px solid #d9d0c1",
  },
  tabBtn: (active) => ({
    fontFamily: "inherit",
    fontSize: 13.5,
    background: "none",
    border: "none",
    padding: "10px 4px",
    marginRight: 22,
    color: active ? "#6e2b2b" : "#8c8375",
    borderBottom: active ? "2px solid #6e2b2b" : "2px solid transparent",
    fontWeight: active ? 600 : 400,
    cursor: "pointer",
  }),
  toolbar: {
    width: "100%",
    maxWidth: 780,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    margin: "14px 0 18px",
  },
  hint: { fontSize: 12.5, color: "#8c8375" },
  printBtn: {
    fontFamily: "inherit",
    fontSize: 13,
    background: "#6e2b2b",
    color: "#fdfcf9",
    border: "none",
    padding: "8px 16px",
    borderRadius: 3,
    cursor: "pointer",
  },
  sheet: {
    width: "100%",
    maxWidth: 780,
    background: "#fdfcf9",
    boxShadow: "0 2px 18px rgba(28,20,15,0.12)",
    padding: "64px 72px",
    fontFamily: "Georgia, 'Iowan Old Style', serif",
    lineHeight: 1.65,
    fontSize: 15,
  },
  docTitle: { textAlign: "center", fontSize: 22, letterSpacing: 1, margin: "0 0 6px" },
  docSubtitle: {
    textAlign: "center",
    fontSize: 13,
    color: "#4a433c",
    margin: "0 0 34px",
    fontStyle: "italic",
  },
  hr: { border: "none", borderTop: "1px solid #d9d0c1", margin: "26px 0" },
  field: {
    background: "rgba(110,43,43,0.08)",
    borderBottom: "1px solid #8a4444",
    padding: "0 3px",
    color: "#6e2b2b",
  },
  clauseList: { paddingLeft: 0, listStyle: "none", counterReset: "clause" },
  clauseItem: { marginBottom: 18, paddingLeft: 30, position: "relative" },
  sigBlock: { marginTop: 46, display: "flex", gap: 40 },
  sigLine: {
    borderTop: "1px solid #201c18",
    marginTop: 46,
    paddingTop: 6,
    fontSize: 12.5,
    color: "#4a433c",
  },
  letterheadName: {
    fontSize: 13,
    letterSpacing: 2,
    color: "#8c8375",
    textAlign: "right",
    marginBottom: 4,
  },
  dateLine: {
    textAlign: "right",
    fontSize: 13.5,
    color: "#4a433c",
    marginBottom: 30,
  },
  note: {
    width: "100%",
    maxWidth: 780,
    fontFamily: "'Helvetica Neue', Arial, sans-serif",
    fontSize: 12.5,
    color: "#8c8375",
    lineHeight: 1.6,
    marginTop: 22,
    padding: "14px 16px",
    borderLeft: "2px solid #8a4444",
  },
};

// Numbered legal clause list — renders "1.", "2." etc. without relying on CSS counters
function ClauseList({ items }) {
  return (
    <ol style={styles.clauseList}>
      {items.map((item, i) => (
        <li key={i} style={styles.clauseItem}>
          <span
            style={{
              position: "absolute",
              left: 0,
              fontWeight: 700,
              color: "#6e2b2b",
            }}
          >
            {i + 1}.
          </span>
          {item}
        </li>
      ))}
    </ol>
  );
}

// Shorthand for an inline editable placeholder field
function Field({ children }) {
  return <span style={styles.field}>{children}</span>;
}

function CoverLetter() {
  return (
    <div style={styles.sheet}>
      <div style={styles.letterheadName}>[FIRM OR PRACTITIONER NAME]</div>
      <div style={styles.dateLine}>[DATE]</div>
      <p>[CLIENT FULL NAME]<br />[CLIENT ADDRESS LINE 1]<br />[CLIENT ADDRESS LINE 2]</p>
      <p>Dear <Field>[CLIENT FIRST NAME]</Field>,</p>
      <p>
        <strong>
          Re: <Field>[Will / Enduring Power of Attorney / Probate Matter]</Field> —
          [MATTER REFERENCE NUMBER]
        </strong>
      </p>
      <p>
        I am writing further to our meeting on <Field>[DATE OF MEETING]</Field> to
        enclose the <Field>[document type]</Field> prepared in accordance with your
        instructions.
      </p>
      <p>Please read the enclosed document carefully. In particular, note the following:</p>
      <ClauseList
        items={[
          <>
            The appointment of <Field>[EXECUTOR / ATTORNEY NAME]</Field> as your{" "}
            <Field>[executor / attorney]</Field>, and of{" "}
            <Field>[SUBSTITUTE NAME]</Field> as a substitute should they be unable or
            unwilling to act.
          </>,
          <>
            The distribution of your estate as set out in{" "}
            <Field>[clause reference]</Field>, including any specific gifts to{" "}
            <Field>[BENEFICIARY NAMES]</Field>.
          </>,
          <>
            The requirements for valid execution: signing in the presence of{" "}
            <Field>[NUMBER]</Field> independent witnesses who are not beneficiaries or
            spouses of beneficiaries.
          </>,
        ]}
      />
      <p>
        Once signed and witnessed, please store the original document safely and let
        this office know where it is kept. We recommend providing a copy to your
        appointed <Field>[executor / attorney]</Field>.
      </p>
      <p>
        If you have any questions before signing, please contact me on{" "}
        <Field>[PHONE NUMBER]</Field> or <Field>[EMAIL]</Field>.
      </p>
      <p style={{ marginTop: 30 }}>Yours sincerely,</p>
      <div style={styles.sigBlock}>
        <div style={{ flex: 1 }}>
          <div style={styles.sigLine}>[PRACTITIONER NAME], [ROLE / QUALIFICATION]</div>
        </div>
      </div>
    </div>
  );
}

function LastWill() {
  return (
    <div style={styles.sheet}>
      <div style={styles.docTitle}>Last Will and Testament</div>
      <div style={styles.docSubtitle}>of [FULL LEGAL NAME]</div>
      <p>
        I, <Field>[FULL LEGAL NAME]</Field>, of <Field>[FULL ADDRESS]</Field>, born{" "}
        <Field>[DATE OF BIRTH]</Field>, declare this to be my Last Will and Testament
        and revoke all earlier wills and testamentary dispositions made by me.
      </p>
      <hr style={styles.hr} />
      <ClauseList
        items={[
          <><strong>Revocation.</strong> I revoke all prior wills and codicils.</>,
          <>
            <strong>Appointment of Executor.</strong> I appoint{" "}
            <Field>[EXECUTOR FULL NAME]</Field> of <Field>[EXECUTOR ADDRESS]</Field>{" "}
            to be the executor and trustee of this my Will (my "Executor"). If{" "}
            <Field>[EXECUTOR FULL NAME]</Field> is unable or unwilling to act, I
            appoint <Field>[SUBSTITUTE EXECUTOR NAME]</Field> as substitute Executor.
          </>,
          <>
            <strong>Guardianship.</strong> If I die leaving a child or children under
            the age of 18, I appoint <Field>[GUARDIAN NAME]</Field> to be the guardian
            of such child or children.
          </>,
          <>
            <strong>Payment of Debts.</strong> I direct my Executor to pay my just
            debts, funeral and testamentary expenses out of my estate as soon as
            practicable after my death.
          </>,
          <>
            <strong>Specific Gifts.</strong> I give the following specific gifts:
            <p style={{ marginTop: 10 }}>
              (a) <Field>[DESCRIPTION OF GIFT]</Field> to{" "}
              <Field>[BENEFICIARY NAME]</Field>;<br />
              (b) <Field>[DESCRIPTION OF GIFT]</Field> to{" "}
              <Field>[BENEFICIARY NAME]</Field>.
            </p>
          </>,
          <>
            <strong>Residuary Estate.</strong> I give the rest and residue of my
            estate, of whatever kind and wherever situated, to{" "}
            <Field>[RESIDUARY BENEFICIARY NAME(S)]</Field>, in equal / the following
            shares: <Field>[SHARES]</Field>. If any residuary beneficiary predeceases
            me, their share shall pass to <Field>[SUBSTITUTE PROVISION]</Field>.
          </>,
          <>
            <strong>Powers of Executor.</strong> My Executor shall have full power to
            sell, invest, and manage my estate as they see fit, without requiring court
            approval, except as required by law.
          </>,
          <>
            <strong>Governing Law.</strong> This Will is governed by the laws of{" "}
            <Field>[JURISDICTION / STATE / COUNTRY]</Field>.
          </>,
        ]}
      />
      <hr style={styles.hr} />
      <p>IN WITNESS WHEREOF, I have signed this Will on <Field>[DATE]</Field>.</p>
      <div style={styles.sigBlock}>
        <div style={{ flex: 1 }}>
          <div style={styles.sigLine}>Signature of Testator — [FULL LEGAL NAME]</div>
        </div>
      </div>
      <p style={{ marginTop: 34 }}>
        Signed by the Testator in our joint presence, and then by us in the presence
        of the Testator and of each other:
      </p>
      <div style={styles.sigBlock}>
        <div style={{ flex: 1 }}>
          <div style={styles.sigLine}>Witness 1 — Name, Address, Occupation</div>
        </div>
        <div style={{ flex: 1 }}>
          <div style={styles.sigLine}>Witness 2 — Name, Address, Occupation</div>
        </div>
      </div>
    </div>
  );
}

function EnduringPOA() {
  return (
    <div style={styles.sheet}>
      <div style={styles.docTitle}>Enduring Power of Attorney</div>
      <div style={styles.docSubtitle}>made by [FULL LEGAL NAME] ("the Donor")</div>
      <p>
        I, <Field>[FULL LEGAL NAME]</Field>, of <Field>[FULL ADDRESS]</Field>, being of
        sound mind, make this Enduring Power of Attorney.
      </p>
      <hr style={styles.hr} />
      <ClauseList
        items={[
          <>
            <strong>Appointment.</strong> I appoint <Field>[ATTORNEY FULL NAME]</Field>{" "}
            of <Field>[ATTORNEY ADDRESS]</Field> to be my attorney (my "Attorney"). If
            they are unable or unwilling to act, I appoint{" "}
            <Field>[SUBSTITUTE ATTORNEY NAME]</Field> as substitute Attorney.
          </>,
          <>
            <strong>Scope of Authority.</strong> My Attorney may act on my behalf in
            relation to:
            <p style={{ marginTop: 10 }}>
              (a) <Field>[personal / financial / property]</Field> matters generally;
              and/or<br />
              (b) the following specific matters:{" "}
              <Field>[LIST SPECIFIC POWERS OR RESTRICTIONS]</Field>.
            </p>
          </>,
          <>
            <strong>Enduring Nature.</strong> This power of attorney continues in
            effect even if I subsequently lose mental capacity, in accordance with{" "}
            <Field>[RELEVANT STATUTE / JURISDICTION]</Field>.
          </>,
          <>
            <strong>Commencement.</strong> This power takes effect{" "}
            <Field>
              [immediately / only upon a determination of incapacity by (NAMED DOCTOR
              OR PROCESS)]
            </Field>
            .
          </>,
          <>
            <strong>Accounts and Records.</strong> My Attorney must keep proper
            records of all transactions undertaken on my behalf and provide these to{" "}
            <Field>[MONITOR / FAMILY MEMBER NAME]</Field> upon reasonable request.
          </>,
          <>
            <strong>Revocation.</strong> I may revoke this power of attorney at any
            time while I have capacity to do so, by notice in writing.
          </>,
          <>
            <strong>Governing Law.</strong> This document is governed by the laws of{" "}
            <Field>[JURISDICTION / STATE / COUNTRY]</Field>.
          </>,
        ]}
      />
      <hr style={styles.hr} />
      <p>SIGNED by the Donor on <Field>[DATE]</Field> in the presence of:</p>
      <div style={styles.sigBlock}>
        <div style={{ flex: 1 }}>
          <div style={styles.sigLine}>Signature of Donor — [FULL LEGAL NAME]</div>
        </div>
      </div>
      <div style={{ ...styles.sigBlock, marginTop: 20 }}>
        <div style={{ flex: 1 }}>
          <div style={styles.sigLine}>
            Witness / Certifying Practitioner — Name, Address, Qualification
          </div>
        </div>
      </div>
      <p style={{ marginTop: 30 }}>
        I, <Field>[ATTORNEY FULL NAME]</Field>, accept this appointment as Attorney
        and acknowledge my duties to act in the Donor's best interests.
      </p>
      <div style={styles.sigBlock}>
        <div style={{ flex: 1 }}>
          <div style={styles.sigLine}>Signature of Attorney — [ATTORNEY FULL NAME]</div>
        </div>
      </div>
    </div>
  );
}

function ProbateLetter() {
  return (
    <div style={styles.sheet}>
      <div style={styles.letterheadName}>[FIRM OR PRACTITIONER NAME]</div>
      <div style={styles.dateLine}>[DATE]</div>
      <p>[RECIPIENT NAME]<br />[RECIPIENT ADDRESS]</p>
      <p>Dear <Field>[RECIPIENT NAME]</Field>,</p>
      <p>
        <strong>
          Re: Estate of the late <Field>[DECEASED FULL NAME]</Field> (deceased [DATE
          OF DEATH]) — Application for [Grant of Probate / Letters of Administration]
        </strong>
      </p>
      <p>
        We act for <Field>[EXECUTOR / ADMINISTRATOR NAME]</Field>, the executor named
        in the Will of the late <Field>[DECEASED FULL NAME]</Field> dated{" "}
        <Field>[WILL DATE]</Field>, in connection with the administration of the above
        estate.
      </p>
      <ClauseList
        items={[
          <>We enclose a certified copy of the death certificate and the original Will for your records.</>,
          <>
            We would be grateful if you could confirm the balance held in account
            number <Field>[ACCOUNT / REFERENCE NUMBER]</Field> as at the date of
            death, <Field>[DATE OF DEATH]</Field>.
          </>,
          <>
            Please advise what documentation you require before releasing these
            funds/assets to the estate, including whether a Grant of Probate must
            first be produced.
          </>,
          <>
            We anticipate applying for the Grant of Probate within{" "}
            <Field>[TIMEFRAME]</Field> and will forward a sealed copy once received.
          </>,
        ]}
      />
      <p>
        Please direct all correspondence regarding this estate to this office in the
        meantime. If you require any further information, do not hesitate to contact
        us on <Field>[PHONE NUMBER]</Field>.
      </p>
      <p style={{ marginTop: 30 }}>Yours faithfully,</p>
      <div style={styles.sigBlock}>
        <div style={{ flex: 1 }}>
          <div style={styles.sigLine}>[PRACTITIONER NAME], on behalf of [FIRM NAME]</div>
        </div>
      </div>
    </div>
  );
}

const PANELS = {
  cover: CoverLetter,
  will: LastWill,
  epa: EnduringPOA,
  probate: ProbateLetter,
};

export default function EstateDocumentTemplates() {
  const [active, setActive] = useState("cover");
  const ActivePanel = PANELS[active];
  const activeLabel = TABS.find((t) => t.id === active)?.label;

  return (
    <div style={styles.page}>
      <div className="estate-print-only" style={styles.header}>
        <h1 style={styles.h1}>Estate &amp; Probate Correspondence Templates</h1>
        <p style={styles.subtitle}>
          Four ready-to-adapt templates: a client cover letter, a Last Will and
          Testament, an Enduring Power of Attorney, and a probate/executor letter.
          Replace every bracketed field, then print or export the one you need.
        </p>
      </div>

      <nav style={styles.tabs}>
        {TABS.map((tab) => (
          <button
            key={tab.id}
            style={styles.tabBtn(active === tab.id)}
            onClick={() => setActive(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      <div style={styles.toolbar}>
        <span style={styles.hint}>Showing: {activeLabel}</span>
        <button style={styles.printBtn} onClick={() => window.print()}>
          Print / Save as PDF
        </button>
      </div>

      <ActivePanel />

      <div style={styles.note}>
        These are general-purpose structural templates, not legal advice.
        Requirements for valid execution, witnessing, capacity, and permitted content
        of wills, enduring powers of attorney, and probate applications vary by
        jurisdiction and change over time. Have the completed documents reviewed by a
        qualified lawyer licensed in the relevant jurisdiction before signing or
        filing.
      </div>

      {/* Print styles: only the active sheet prints, at letter-page margins */}
      <style>{`
        @media print {
          body { background: #fff; }
          nav, .estate-print-only, button { display: none !important; }
        }
      `}</style>
    </div>
  );
}
