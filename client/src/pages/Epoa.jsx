import { useState } from 'react'
import { Link } from 'react-router-dom'
import EpoaQuestionnaire from '../components/epoa/EpoaQuestionnaire'
import EpoaPreview from '../components/document/EpoaPreview'
import './Homepage.css'

function Epoa() {
  const [answers, setAnswers] = useState({})
  const [generatedEpoa, setGeneratedEpoa] = useState(null)

  return (
    <div className="sr-wrap">
      <Link to="/" className="sr-back-link">&larr; Back to the Succession Register</Link>
      <h1 className="sr-title">Enduring power of attorney questionnaire</h1>
      <p className="sr-lede">
        Answer the questions below to generate a draft enduring power of attorney. This is a
        separate document from your will — it applies while you're alive, not after.
      </p>
      <EpoaQuestionnaire
        answers={answers}
        setAnswers={setAnswers}
        onGenerate={setGeneratedEpoa}
      />
      {generatedEpoa && <EpoaPreview epoa={generatedEpoa} />}
    </div>
  )
}

export default Epoa
