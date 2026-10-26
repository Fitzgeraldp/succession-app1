import { Routes, Route } from 'react-router-dom'
import Wills from './pages/Wills'
import Form from './pages/Form'
import Epoa from './pages/Epoa'
import Probate from './pages/Probate'
import EstateDocumentTemplates from './pages/EstateDocumentTemplates'
import FAQs from './pages/FAQs'
import Library from './pages/Library'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Wills />} />
      <Route path="/questionnaire" element={<Form />} />
      <Route path="/epoa" element={<Epoa />} />
      <Route path="/probate" element={<Probate />} />
      <Route path="/templates" element={<EstateDocumentTemplates />} />
      <Route path="/faqs" element={<FAQs />} />
      <Route path="/library" element={<Library />} />
    </Routes>
  )
}

export default App
