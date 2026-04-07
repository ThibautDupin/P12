const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:3000'

// Classe centrale pour toutes les requêtes utilisateur.
class UserService {
  constructor(baseUrl = API_BASE_URL) {
    this.baseUrl = baseUrl
  }

  // Fonction de récupération générique qui gère les erreurs et extrait la partie "data".
  async fetchJson(path) {
    let response

    try {
      response = await fetch(`${this.baseUrl}${path}`)
    } catch (error) {
      throw new Error(`Erreur de connexion à l'API: ${error.message}`)
    }

    const payload = await response.json()
    return payload?.data ?? null
  }

  // Normalise les données utilisateur pour garantir une structure stable.
  formatUser(data) {
    if (!data) {
      return null
    }

    return {
      id: data.id,
      userInfos: data.userInfos ?? {},
      score: data.score ?? data.todayScore ?? 0,
      keyData: data.keyData ?? {},
    }
  }

  // Normalise les sessions d'activité quotidienne.
  formatActivity(data) {
    const sessions = data?.sessions ?? []
    return sessions.map((session) => ({
      day: session.day,
      kilogram: session.kilogram,
      calories: session.calories,
    }))
  }

  // Normalise les sessions moyennes.
  formatAverageSessions(data) {
    const sessions = data?.sessions ?? []
    return sessions.map((session) => ({
      day: session.day,
      sessionLength: session.sessionLength,
    }))
  }

  // Normalise la performance (radar chart).
  formatPerformance(data) {
    if (!data) {
      return null
    }

    return {
      userId: data.userId,
      kind: data.kind ?? {},
      data: (data.data ?? []).map((entry) => ({
        value: entry.value,
        kind: entry.kind,
      })),
    }
  }

  // Données de base d'un utilisateur (nom, score, keyData).
  async fetchUser(userId) {
    if (!userId) {
      throw new Error('userId est requis pour récupérer un utilisateur.')
    }

    const data = await this.fetchJson(`/user/${userId}`)
    return this.formatUser(data)
  }

  // Activités quotidiennes de l'utilisateur.
  async fetchUserActivity(userId) {
    if (!userId) {
      throw new Error('userId est requis pour récupérer les activités.')
    }

    const data = await this.fetchJson(`/user/${userId}/activity`)
    return this.formatActivity(data)
  }

  // Sessions moyennes de l'utilisateur.
  async fetchUserAverageSessions(userId) {
    if (!userId) {
      throw new Error('userId est requis pour récupérer les sessions moyennes.')
    }

    const data = await this.fetchJson(`/user/${userId}/average-sessions`)
    return this.formatAverageSessions(data)
  }

  // Performances de l'utilisateur.
  async fetchUserPerformance(userId) {
    if (!userId) {
      throw new Error('userId est requis pour récupérer les performances.')
    }

    const data = await this.fetchJson(`/user/${userId}/performance`)
    return this.formatPerformance(data)
  }
}

const userService = new UserService()

export { UserService, userService }
