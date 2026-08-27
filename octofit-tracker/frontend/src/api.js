const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : window.location.hostname === 'localhost' ? 'http://localhost:8000' : ''

export async function fetchCollection(component, endpoint) {
  if (!apiBaseUrl) throw new Error('VITE_CODESPACE_NAME is not configured.')
  const response = await fetch(endpoint || `${apiBaseUrl}/api/${component}/`)
  if (!response.ok) throw new Error(`Unable to load ${component}.`)
  const payload = await response.json()
  if (Array.isArray(payload)) return payload
  return payload.results || payload.data || payload.items || []
}