const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:3000'

async function fetchJson(path) {


  let response

  try {
  response = await fetch(`${API_BASE_URL}${path}`)
  } catch (error) {
    throw new Error(`Erreur de connexion à l'API: ${error.message}`)
  }
  const payload = await response.json()
  return payload?.data ?? null
}

export async function fetchUser(userId) {
  if (!userId) {
    throw new Error('userId est requis pour récupérer un utilisateur.')
  }

  return fetchJson(`/user/${userId}`)
}

export async function fetchUserActivity(userId) {
  if (!userId) {
    throw new Error('userId est requis pour récupérer les activités.')
  }

  const data = await fetchJson(`/user/${userId}/activity`)
  return data?.sessions ?? []
}

export async function fetchUserAverageSessions(userId) {
  if (!userId) {
    throw new Error('userId est requis pour récupérer les sessions moyennes.')
  }

  const data = await fetchJson(`/user/${userId}/average-sessions`)
  return data?.sessions ?? []
}

export async function fetchUserPerformance(userId) {
  if (!userId) {
    throw new Error('userId est requis pour récupérer la performance.')
  }

  return fetchJson(`/user/${userId}/performance`)
}
