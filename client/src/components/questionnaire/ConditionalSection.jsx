// Renders its children only when `show` is truthy — used to reveal a
// question that only applies based on an earlier answer (e.g. only ask
// for a guardian's name if the client has children under 18).
function ConditionalSection({ show, children }) {
  if (!show) return null
  return <>{children}</>
}

export default ConditionalSection
