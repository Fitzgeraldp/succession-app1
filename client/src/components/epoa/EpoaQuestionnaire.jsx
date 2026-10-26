import { useState } from 'react'
import { generateEpoa, createClient } from '../../api/client'
import ConditionalSection from './ConditionalSection'

// Demo-only default: the seed data (database/seeds/seed_clauses_nsw_epoa.sql)
// currently only has clause content for NSW, so the demo questionnaire
// creates its client under that jurisdiction. Once there's real client
// intake / a jurisdiction picker in the UI, replace this with the
// client's actual selected jurisdiction.
const DEMO_JURISDICTION = 'NSW'

function EpoaQuestionnaire({ answers, setAnswers, onGenerate }) {
  const updateAnswer = (key, value) => {
    setAnswers({ ...answers, [key]: value })
  }

  const [error, setError] = useState(null)
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setSubmitting(true)
    try {
      // Demo flow: create the client record first (no client-intake step
      // exists yet), then generate the EPOA against the real client id.
      const client = await createClient({
        fullName: answers.fullName,
        dateOfBirth: answers.dateOfBirth,
        address: answers.address,
        jurisdiction: DEMO_JURISDICTION
      })
      const result = await generateEpoa(client.client_id, answers, {
        full_name: answers.fullName,
        address: answers.address,
        attorney_name: answers.attorneyName,
        additional_attorney_name: answers.additionalAttorneyName,
        attorney_acting: answers.attorneyActing,
        alternate_attorney_name: answers.alternateAttorneyName,
        scope: answers.scope,
        restrictions: answers.restrictions,
        allow_gifts: answers.allowGifts,
        gift_instructions: answers.giftInstructions,
        effective_when: answers.effectiveWhen,
        revokes_previous: answers.revokesPrevious
      })
      onGenerate(result.epoa)
    } catch (err) {
      setError(err.message)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Full Name:</label>
        <input
          type="text"
          value={answers.fullName || ''}
          onChange={e => updateAnswer('fullName', e.target.value)}
          required
        />
      </div>
      <br />

      <div>
        <label>Date of Birth:</label>
        <input
          type="date"
          value={answers.dateOfBirth || ''}
          onChange={e => updateAnswer('dateOfBirth', e.target.value)}
          required
        />
      </div>
      <br />

      <div>
        <label>Address:</label>
        <input
          type="text"
          value={answers.address || ''}
          onChange={e => updateAnswer('address', e.target.value)}
          required
        />
      </div>
      <br />

      <div>
        <label>Attorney's full name:</label>
        <input
          type="text"
          value={answers.attorneyName || ''}
          onChange={e => updateAnswer('attorneyName', e.target.value)}
          required
        />
      </div>
      <br />

      <div>
        <label>Do you want to appoint more than one attorney?</label>
        <input
          type="checkbox"
          checked={answers.hasAdditionalAttorney || false}
          onChange={e => updateAnswer('hasAdditionalAttorney', e.target.checked)}
        />
      </div>

      <ConditionalSection show={answers.hasAdditionalAttorney}>
        <label>
          Additional attorney's full name:
          <input
            value={answers.additionalAttorneyName || ''}
            onChange={e => updateAnswer('additionalAttorneyName', e.target.value)}
          />
        </label>
        <br />
        <p>Should your attorneys act:</p>
        <label>
          <input
            type="radio"
            name="attorneyActing"
            checked={answers.attorneyActing === 'jointly'}
            onChange={() => updateAnswer('attorneyActing', 'jointly')}
          /> Jointly (together on every decision)
        </label>
        <label style={{ marginLeft: '1rem' }}>
          <input
            type="radio"
            name="attorneyActing"
            checked={answers.attorneyActing === 'severally'}
            onChange={() => updateAnswer('attorneyActing', 'severally')}
          /> Severally (each able to act independently)
        </label>
      </ConditionalSection>
      <br />

      <div>
        <label>Do you want to name an alternate attorney?</label>
        <input
          type="checkbox"
          checked={answers.hasAlternateAttorney || false}
          onChange={e => updateAnswer('hasAlternateAttorney', e.target.checked)}
        />
      </div>

      <ConditionalSection show={answers.hasAlternateAttorney}>
        <label>
          Alternate attorney's full name:
          <input
            value={answers.alternateAttorneyName || ''}
            onChange={e => updateAnswer('alternateAttorneyName', e.target.value)}
          />
        </label>
      </ConditionalSection>
      <br />

      <div>
        <label>What should your attorney be able to make decisions about?</label>
        <select
          value={answers.scope || ''}
          onChange={e => updateAnswer('scope', e.target.value)}
          required
        >
          <option value="">Select</option>
          <option value="financial">Financial matters only</option>
          <option value="personal">Personal and health matters only</option>
          <option value="both">Financial, personal and health matters</option>
        </select>
      </div>
      <br />

      <div>
        <label>Any restrictions on your attorney's authority:</label>
        <input
          type="text"
          value={answers.restrictions || ''}
          onChange={e => updateAnswer('restrictions', e.target.value)}
          placeholder="e.g. may not sell my house"
        />
      </div>
      <br />

      <div>
        <label>Should your attorney be able to make gifts on your behalf?</label>
        <input
          type="checkbox"
          checked={answers.allowGifts || false}
          onChange={e => updateAnswer('allowGifts', e.target.checked)}
        />
      </div>

      <ConditionalSection show={answers.allowGifts}>
        <label>
          Instructions or limits for gifts:
          <input
            value={answers.giftInstructions || ''}
            onChange={e => updateAnswer('giftInstructions', e.target.value)}
            placeholder="e.g. up to $500 per year to family members"
          />
        </label>
      </ConditionalSection>
      <br />

      <div>
        <p>When should this power of attorney take effect?</p>
        <label>
          <input
            type="radio"
            name="effectiveWhen"
            checked={answers.effectiveWhen === 'immediately'}
            onChange={() => updateAnswer('effectiveWhen', 'immediately')}
          /> Immediately, upon signing
        </label>
        <label style={{ marginLeft: '1rem' }}>
          <input
            type="radio"
            name="effectiveWhen"
            checked={answers.effectiveWhen === 'onIncapacity'}
            onChange={() => updateAnswer('effectiveWhen', 'onIncapacity')}
          /> Only if I lose capacity to make my own decisions
        </label>
      </div>
      <br />

      <div>
        <label>Does this revoke any previous power of attorney you've made?</label>
        <input
          type="checkbox"
          checked={answers.revokesPrevious || false}
          onChange={e => updateAnswer('revokesPrevious', e.target.checked)}
        />
      </div>
      <br />

      <div>
        <label>Additional Instructions:</label>
        <input
          type="text"
          value={answers.additionalInstructions || ''}
          onChange={e => updateAnswer('additionalInstructions', e.target.value)}
        />
      </div>
      <br />

      {error && (
        <p role="alert" style={{ color: '#b00020' }}>
          {error}
        </p>
      )}
      <button type="submit" disabled={submitting}>
        {submitting ? 'Generating…' : 'Generate Draft EPOA'}
      </button>
    </form>
  )
}

export default EpoaQuestionnaire
