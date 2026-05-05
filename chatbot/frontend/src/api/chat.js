// Vite proxea /api/* a Flask en desarrollo (ver vite.config.js)
const API_URL = import.meta.env.VITE_API_URL ?? ''

export async function sendMessage(messages) {
  const res = await fetch(`${API_URL}/api/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ messages }),
  })
  if (!res.ok) throw new Error(`Error del servidor: ${res.status}`)
  return (await res.json()).response
}

export async function checkHealth() {
  const res = await fetch(`${API_URL}/api/health`, { signal: AbortSignal.timeout(5000) })
  return res.json()
}
