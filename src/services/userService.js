const API_BASE_URL = 'http://localhost:3000'

export async function fetchUser(userId) {
  // Vérifie que l'identifiant utilisateur est bien fourni.
  if (!userId) {
    throw new Error('userId est requis pour récupérer un utilisateur.')
  }

  // Appelle l'endpoint user de l'API Back-end SportSee.
  const res = await fetch(`${API_BASE_URL}/user/${userId}`)

  // Stoppe le flux si la réponse HTTP n'est pas valide.
  if (!res.ok) {
    throw new Error(`Erreur API (${res.status})`)
  }
  const json = await res.json()
  return json?.data ?? null
}
