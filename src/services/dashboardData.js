import {
  USER_MAIN_DATA,
  USER_ACTIVITY,
  USER_AVERAGE_SESSIONS,
  USER_PERFORMANCE,
} from '../../data.js'
import {
  fetchUser,
  fetchUserActivity,
  fetchUserAverageSessions,
  fetchUserPerformance,
} from './userService.js'

// Indique si l'on doit utiliser l'API distante ou les données locales.
const USE_API = String(import.meta.env.VITE_USE_API ?? 'false').toLowerCase() === 'true'

// Construit un objet de tableau de bord à partir des données locales.
function getLocalDashboardData(userId = 12) {
  const user = USER_MAIN_DATA?.find((entry) => entry.id === userId) ?? null
  const firstName = user?.userInfos?.firstName ?? 'Utilisateur'
  const score = user?.todayScore ?? user?.score ?? 0
  const keyData = user?.keyData ?? {}

  const activitySessions =
    USER_ACTIVITY?.find((entry) => entry.userId === userId)?.sessions ?? []

  const averageSessions =
    USER_AVERAGE_SESSIONS?.find((entry) => entry.userId === userId)?.sessions ?? []

  const performance =
    USER_PERFORMANCE?.find((entry) => entry.userId === userId) ?? null

  return {
    userId,
    user,
    firstName,
    score,
    keyData,
    activitySessions,
    averageSessions,
    performance,
  }
}

export async function getDashboardData(userId = 12) {
  // Si l'API est désactivée, on renvoie directement les données locales.
  if (!USE_API) {
    return getLocalDashboardData(userId)
  }

  // Sinon, on récupère toutes les ressources en parallèle.
  const [user, activitySessions, averageSessions, performance] = await Promise.all([
    fetchUser(userId),
    fetchUserActivity(userId),
    fetchUserAverageSessions(userId),
    fetchUserPerformance(userId),
  ])

  const firstName = user?.userInfos?.firstName ?? 'Utilisateur'
  const score = user?.todayScore ?? user?.score ?? 0
  const keyData = user?.keyData ?? {}

  return {
    userId,
    user,
    firstName,
    score,
    keyData,
    activitySessions,
    averageSessions,
    performance,
  }
}
