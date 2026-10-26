const BASE_URL = '/api'
const TOKEN_KEY = 'authToken'

function getToken() {
  try {
    return localStorage.getItem(TOKEN_KEY)
  } catch {
    return null
  }
}

function setToken(token) {
  try {
    localStorage.setItem(TOKEN_KEY, token)
  } catch {
    // ignore (e.g. private browsing with storage disabled)
  }
}

export function clearToken() {
  try {
    localStorage.removeItem(TOKEN_KEY)
  } catch {
    // ignore
  }
}

export function isLoggedIn() {
  return Boolean(getToken())
}

// Every route except /api/auth/* now requires a logged-in lawyer
// (see server/src/app.js) — attach the stored token if we have one.
function authHeaders() {
  const token = getToken()
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {})
  }
}

// Shared response handling for authenticated calls: a 401 means the stored
// token is missing/expired, so drop it and tell the user to log in again.
async function handleResponse(res, fallbackMessage) {
  if (res.status === 401) {
    clearToken()
    throw new Error('Your session has expired or you are not logged in. Please log in and try again.')
  }
  if (!res.ok) {
    const body = await res.json().catch(() => ({}))
    throw new Error(body.error || fallbackMessage)
  }
  return res.json()
}

export async function register(fullName, email, password) {
  const res = await fetch(`${BASE_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ fullName, email, password })
  })
  if (!res.ok) {
    const body = await res.json().catch(() => ({}))
    throw new Error(body.error || 'Failed to create account')
  }
  return res.json()
}

export async function login(email, password) {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  })
  if (!res.ok) {
    const body = await res.json().catch(() => ({}))
    throw new Error(body.error || 'Failed to log in')
  }
  const data = await res.json()
  setToken(data.token)
  return data
}

export async function generateWill(clientId, answers, placeholderData) {
  const res = await fetch(`${BASE_URL}/wills/generate`, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify({ clientId, answers, placeholderData })
  })
  return handleResponse(res, 'Failed to generate will')
}

export async function generateEpoa(clientId, answers, placeholderData) {
  const res = await fetch(`${BASE_URL}/epoa/generate`, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify({ clientId, answers, placeholderData })
  })
  return handleResponse(res, 'Failed to generate EPOA')
}

export async function createClient(clientData) {
  const res = await fetch(`${BASE_URL}/clients`, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify(clientData)
  })
  return handleResponse(res, 'Failed to create client')
}
