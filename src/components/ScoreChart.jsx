import {
  PolarAngleAxis,
  RadialBar,
  RadialBarChart,
  ResponsiveContainer,
} from 'recharts'
import '../css/ScoreChart.css'

// Normalise un score (0-1 ou 0-100) en ratio 0-1.
function normalizeScore(score) {
  if (Number.isNaN(score) || score === null || score === undefined) {
    return 0
  }

  const numericScore = Number(score)
  if (Number.isNaN(numericScore)) {
    return 0
  }

  const ratio = numericScore > 1 ? numericScore / 100 : numericScore
  return Math.min(Math.max(ratio, 0), 1)
}

function ScoreChart({ score = 0.7 }) {
  // Convertit le score en pourcentage pour l'affichage.
  const normalizedScore = normalizeScore(score)
  const percentage = Math.round(normalizedScore * 100)
  const chartData = [{ name: 'score', value: percentage }]

  return (
    <section className="score-chart">
      <header className="score-chart__header">
        <h2>Score</h2>
      </header>
      <div className="score-chart__chart">
        <ResponsiveContainer width="100%" height="100%">
          <RadialBarChart
            data={chartData}
            innerRadius="70%"
            outerRadius="90%"
            startAngle={90}
            endAngle={450}
            barSize={10}
          >
            {/* Axe angulaire masqué pour une jauge propre. */}
            <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
            {/* Arc de score rempli en rouge. */}
            <RadialBar dataKey="value" fill="#f91616" cornerRadius={10} />
          </RadialBarChart>
        </ResponsiveContainer>
        <div className="score-chart__label">
          <span className="score-chart__value">{percentage}%</span>
          <span className="score-chart__subtitle">de votre objectif</span>
        </div>
      </div>
    </section>
  )
}

export default ScoreChart
