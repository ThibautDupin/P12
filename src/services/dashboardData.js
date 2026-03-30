import dataSource from '../../data.js'

// Déstructure les différentes collections de données mockées.
const {
  USER_MAIN_DATA: mainData,
  USER_ACTIVITY: activityData,
  USER_AVERAGE_SESSIONS: avgSessionData,
  USER_PERFORMANCE: perfData,
} = dataSource

export function getDashboardData(userId = 12) {
  // Récupère l'utilisateur selon son identifiant.
  const user = mainData?.find((entry) => entry.id === userId) ?? null
  // Définit les valeurs de fallback si certaines données sont absentes.
  const firstName = user?.userInfos?.firstName ?? 'Utilisateur'
  const score = user?.todayScore ?? user?.score ?? 0
  const keyData = user?.keyData ?? {}

  // Récupère les sessions d'activité quotidienne.
  const activitySessions =
    activityData?.find((entry) => entry.userId === userId)?.sessions ?? []

  // Récupère les sessions moyennes hebdomadaires.
  const averageSessions =
    avgSessionData?.find((entry) => entry.userId === userId)?.sessions ?? []

  // Récupère les données de performance par catégorie.
  const performance =
    perfData?.find((entry) => entry.userId === userId) ?? null

  // Retourne un objet qui contient toutes les données nécessaires pour le tableau de bord de l'utilisateur.
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
