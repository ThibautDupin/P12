import dataSource from '../../data.js'

const {
  USER_MAIN_DATA,
  USER_ACTIVITY,
  USER_AVERAGE_SESSIONS,
  USER_PERFORMANCE,
} = dataSource

export function getDashboardData(userId = 12) {
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
