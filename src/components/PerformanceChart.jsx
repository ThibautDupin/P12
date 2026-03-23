import {
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  ResponsiveContainer,
} from 'recharts'
import '../css/PerformanceChart.css'
import { USER_PERFORMANCE } from '../../data.js'

const LABELS = {
  cardio: 'Cardio',
  energy: 'Énergie',
  endurance: 'Endurance',
  strength: 'Force',
  speed: 'Vitesse',
  intensity: 'Intensité',
}

function buildPerformanceData(userId) {
  const userPerformance = USER_PERFORMANCE?.find((entry) => entry.userId === userId)
  const kindMap = userPerformance?.kind ?? {}
  const baseData = userPerformance?.data ?? []

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

function PerformanceChart({ userId = 12 }) {
  const chartData = buildPerformanceData(userId)

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
