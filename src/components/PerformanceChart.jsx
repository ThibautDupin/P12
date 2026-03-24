import {
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  ResponsiveContainer,
} from 'recharts'
import '../css/PerformanceChart.css'

const LABELS = {
  cardio: 'Cardio',
  energy: 'Énergie',
  endurance: 'Endurance',
  strength: 'Force',
  speed: 'Vitesse',
  intensity: 'Intensité',
}

function buildPerformanceData(performance) {
  const kindMap = performance?.kind ?? {}
  const baseData = performance?.data ?? []

  return baseData
    .map((entry) => {
      const labelKey = kindMap[entry.kind] ?? entry.kind
      return {
        value: entry.value,
        label: LABELS[labelKey] ?? String(labelKey),
      }
    })
    .reverse()
}

function PerformanceChart({ performance }) {
  const chartData = buildPerformanceData(performance)

  return (
    <section className="performance-chart">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart data={chartData} outerRadius="70%">
          <PolarGrid gridType="polygon" radialLines={false} />
          <PolarAngleAxis dataKey="label" tick={{ fill: '#ffffff', fontSize: 12 }} />
          <Radar dataKey="value" fill="#f91616" fillOpacity={0.7} />
        </RadarChart>
      </ResponsiveContainer>
    </section>
  )
}

export default PerformanceChart
