
import DailyActivity from './DailyActivity.jsx'
import AverageSessions from './AverageSessions.jsx'
import PerformanceChart from './PerformanceChart.jsx'
import ScoreChart from './ScoreChart.jsx'
import NutritionTiles from './NutritionTiles.jsx'
import { getDashboardData } from '../services/dashboardData.js'

import '../css/ChartsSection.css'

function ChartsSection() {
  const {
    firstName,
    score,
    keyData,
    activitySessions,
    averageSessions,
    performance,
  } = getDashboardData(12)

  return (
    <section className="charts">
      <header className="charts-header">
        <h1>
          Bienvenue <span>{firstName}</span>
        </h1>
        <p>Félicitations vous avez explosé vos objectifs hier</p>
      </header>
      <div className="charts-content">
        <div className="charts-content__main">
          <DailyActivity sessions={activitySessions} />
          <AverageSessions sessions={averageSessions} />
          <PerformanceChart performance={performance} />
          <ScoreChart score={score} />
        
        </div>
        <NutritionTiles keyData={keyData} />
        
      </div>
    </section>
  )
}

export default ChartsSection
