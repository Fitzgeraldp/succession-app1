import { useState } from 'react'
import { Link } from 'react-router-dom'
import Questionnaire from '../components/questionnaire/Questionnaire'
import WillPreview from '../components/document/WillPreview'
import './Homepage.css'

function Form() {
  const [answers, setAnswers] = useState({})
  const [generatedWill, setGeneratedWill] = useState(null)

  return (
    <div className="sr-wrap">
      <Link to="/" className="sr-back-link">&larr; Back to the Succession Register</Link>
      <h1 className="sr-title">Will questionnaire</h1>
      <p className="sr-lede">
        Answer the questions below to generate a draft will. Nothing is finalised until you
        review it with a solicitor.
      </p>
      <Questionnaire
        answers={answers}
        setAnswers={setAnswers}
        onGenerate={setGeneratedWill}
      />
      {generatedWill && <WillPreview will={generatedWill} />}
    </div>
  )
}

export default Form
