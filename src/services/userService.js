const API_BASE_URL = 'http://localhost:3000'

export async function fetchUser(userId) {
  if (!userId) {
    throw new Error('userId est requis pour récupérer un utilisateur.')
  }

  const response = await fetch(`${API_BASE_URL}/user/${userId}`)

  if (!response.ok) {
    throw new Error(`Erreur API (${response.status})`)
  }

  const payload = await response.json()
  return payload?.data ?? null
}
