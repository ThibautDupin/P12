
import { useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import DailyActivity from './DailyActivity.jsx'
import AverageSessions from './AverageSessions.jsx'
import PerformanceChart from './PerformanceChart.jsx'
import ScoreChart from './ScoreChart.jsx'
import NutritionTiles from './NutritionTiles.jsx'
import { getDashboardData } from '../services/dashboardData.js'

import '../css/ChartsSection.css'

// Section principale qui orchestre le chargement et l'affichage des graphiques.
function ChartsSection({ userId: userIdProp }) {
  // Récupère l'ID utilisateur depuis les paramètres d'URL via useParams.
  const { userId: userIdParam } = useParams()
  // Utilise useMemo pour éviter de recalculer l'ID à chaque rendu.
  const resolvedUserId = useMemo(() => {
  // Vérifie si userIdParam est défini, sinon utilise userIdProp.
  // Convertit simplement en nombre ou retourne 0 si la valeur est vide.
    const candidate = userIdParam ?? userIdProp
    const parsed = Number(candidate)
  return parsed || 0

  }, [userIdParam, userIdProp]) // Tableau de dépendances de useMemo

  // Mise en place d'un useState pour stocker les données du tableau de bord, avec des valeurs par défaut.
  const [dashboardData, setDashboardData] = useState({
    firstName: '',
    score: 0,
    keyData: {},
    activitySessions: [],
    averageSessions: [],
    performance: null,
  })

  useEffect(() => {
    let isMounted = true

    const loadDashboard = async () => {
      try {
        // Charge les données en fonction de l'utilisateur choisi.
        const data = await getDashboardData(resolvedUserId)
        if (isMounted) {
          setDashboardData(data)
        }
      } catch (error) {
        console.error(error)
      }
    }

    loadDashboard()

    return () => {
      isMounted = false
    }
  }, [resolvedUserId])

  // Déstructure les données pour alimenter les sous-composants.
  const {
    firstName,
    score,
    keyData,
    activitySessions,
    averageSessions,
    performance,
  } = dashboardData

  return (
    <section className="charts">
      <header className="charts-header">
        <h1>
          Bonjour <span>{firstName}</span>
        </h1>
        <p>Félicitations vous avez explosé vos objectifs hier</p>
      </header>
      <div className="charts-content">
        <div className="charts-content__main">
          <DailyActivity sessions={activitySessions} />
          <div className="charts_content_stats">
          <AverageSessions sessions={averageSessions} />
          <PerformanceChart performance={performance} />
          <ScoreChart score={score} /> 
          </div>
        
        </div>
        <NutritionTiles keyData={keyData} />
        
      </div>
    </section>
  )
}

export default ChartsSection
