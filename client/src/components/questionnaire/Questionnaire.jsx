import { useState } from 'react'
import { generateWill, createClient } from '../../api/client'
import ConditionalSection from './ConditionalSection'

// Demo-only default: the seed data (database/seeds/seed_clauses_nsw.sql)
// currently only has clause content for NSW, so the demo questionnaire
// creates its client under that jurisdiction. Once there's real client
// intake / a jurisdiction picker in the UI, replace this with the
// client's actual selected jurisdiction.
const DEMO_JURISDICTION = 'NSW'

function Questionnaire({ answers, setAnswers, onGenerate }) {
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
      // exists yet), then generate the will against the real client id.
      const client = await createClient({
        fullName: answers.fullName,
        dateOfBirth: answers.dateOfBirth,
        address: answers.address,
        jurisdiction: DEMO_JURISDICTION,
        maritalStatus: answers.maritalStatus
      })
      const result = await generateWill(client.client_id, answers, {
        full_name: answers.fullName,
        address: answers.address,
        executor_name: answers.executorName,
        alternate_executor_name: answers.alternateExecutorName,
        guardian_name: answers.guardianName,
        alternate_guardian_name: answers.alternateGuardianName,
        residuary_beneficiary: answers.residuaryBeneficiary,
        beneficiaries: answers.beneficiaries,
        executors: answers.executors
      })
      onGenerate(result.will)
    } catch (err) {
      setError(err.message)
    } finally {
      setSubmitting(false)
    }
  }

  /*
Personal details
Full legal name, any former or alternate names
Date of birth
Current address
Marital or relationship status (single, married, de facto, separated, divorced)
Occupation
Family and dependents
Names of children (including from previous relationships or adopted)
Are any children under 18, or adult children with a disability who need ongoing care?
Names of grandchildren, if they're to be included
Anyone financially dependent on you who isn't a child (e.g. an elderly parent)
Executor(s)
Who should administer the estate?
Is there a backup (alternate) executor if the first is unable or unwilling to act?
Should multiple executors act jointly, or can any one of them act alone?
Guardianship (if there are children under 18)
Who should become the children's guardian?
Is there an alternate guardian?
Any specific wishes about how the children should be raised (education, religion, etc.)?
Beneficiaries and assets
Who should inherit, and in what shares or proportions?
Are there specific gifts — a particular item, sum of money, or piece of property — to a particular person?
Who receives the remainder of the estate (the "residuary beneficiary") after specific gifts are distributed?
Any assets outside the will's control (jointly owned property, superannuation/retirement accounts, life insurance with a nominated beneficiary)?
What happens if a named beneficiary dies before you?
Debts and liabilities
Outstanding debts, mortgages, or loans to be paid from the estate
Any business interests and what should happen to them
Funeral and final wishes
Burial or cremation preferences
Any specific instructions for a funeral or memorial
Other instructions
Pet care arrangements
Digital assets (social media, cryptocurrency, online accounts)
Anything explicitly excluded — e.g. deliberately leaving someone out (this often needs to be stated clearly to avoid later disputes)
Witnessing
Who will act as witnesses, and do they meet your jurisdiction's requirements (not a beneficiary, correct age, etc.)?
  */

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Full legal name, any former or alternate names:</label>
        <input
          type="text"
          value={answers.fullName || ''}
          onChange={e => updateAnswer('fullName', e.target.value)}
          required
        />
      </div>
      <br />

      <div>
        <label>Marital Status:</label>
        <select
          value={answers.maritalStatus || ''}
          onChange={e => updateAnswer('maritalStatus', e.target.value)}
          required
        >
          <option value="">Select</option>
          <option value="single">Single</option>
          <option value="married">Married</option>
          <option value="deFactoRelationship">De facto relationship</option>
          <option value="samesexRelationship">Same-sex relationship</option>
        </select>
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

      <div>
        <p>Are you over 18 years of age or entering into a relationship?</p>
        <label>
          <input
            type="radio"
            name="isOverEighteen"
            checked={answers.isOverEighteen === true}
            onChange={() => updateAnswer('isOverEighteen', true)}
          /> Yes
        </label>
        <label style={{ marginLeft: '1rem' }}>
          <input
            type="radio"
            name="isOverEighteen"
            checked={answers.isOverEighteen === false}
            onChange={() => updateAnswer('isOverEighteen', false)}
          /> No
        </label>
      </div>
      <br />

      <div>
        <label>Gender:</label>
        <select
          value={answers.gender || ''}
          onChange={e => updateAnswer('gender', e.target.value)}
          required
        >
          <option value="">Select</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
      </div>
      <br />

      <div>
        <label>Occupation:</label>
        <input
          type="text"
          value={answers.occupation || ''}
          onChange={e => updateAnswer('occupation', e.target.value)}
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
        <label>Beneficiary(s):</label>
        <input
          type="text"
          value={answers.beneficiaries || ''}
          onChange={e => updateAnswer('beneficiaries', e.target.value)}
          required
        />
      </div>
      <br />

      <div>
        <label>Executor's full name:</label>
        <input
          type="text"
          value={answers.executorName || ''}
          onChange={e => updateAnswer('executorName', e.target.value)}
          required
        />
      </div>
      <br />

      <div>
        <label>Do you have children?</label>
        <input
          type="checkbox"
          checked={answers.hasChildren || false}
          onChange={e => updateAnswer('hasChildren', e.target.checked)}
        />
      </div>
      <br />

      <div>
        <label>Specify your child/children's names:</label>
        <input
          type="text"
          value={answers.childrenNames || ''}
          onChange={e => updateAnswer('childrenNames', e.target.value)}
        />
      </div>
      <br />

      <div>
        <label>Do you have children under 18?</label>
        <input
          type="checkbox"
          checked={answers.hasMinorChildren || false}
          onChange={e => updateAnswer('hasMinorChildren', e.target.checked)}
        />
      </div>

      <ConditionalSection show={answers.hasMinorChildren}>
        <label>
          Guardian's full name:
          <input
            value={answers.guardianName || ''}
            onChange={e => updateAnswer('guardianName', e.target.value)}
          />
        </label>
      </ConditionalSection>
      <br />

      <div>
        <label>Other Instruction(s):</label>
        <input
          type="text"
          value={answers.otherInstructions || ''}
          onChange={e => updateAnswer('otherInstructions', e.target.value)}
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
        {submitting ? 'Generating…' : 'Generate Draft Will'}
      </button>
    </form>
  )
}

export default Questionnaire