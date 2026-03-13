
import DailyActivity from './DailyActivity.jsx'
import AverageSessions from './AverageSessions.jsx'
import NutritionTiles from './NutritionTiles.jsx'

import '../css/ChartsSection.css'
function ChartsSection() {
  return (
    <section className="charts">
      <header className="charts-header">
        <h1>
          Bienvenue <span>Thomas</span>
        </h1>
        <p>Félicitations vous avez explosé vos objectifs hier</p>
      </header>
      <div className="charts-content">
        <div className="charts-content__main">
          <DailyActivity />
          <AverageSessions />
        
        </div>
        <NutritionTiles />
        
      </div>
    </section>
  )
}

export default ChartsSection
