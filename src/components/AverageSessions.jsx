import {
  Line,
  LineChart,
  Rectangle,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import '../css/AverageSessions.css'
// Libellés courts pour chaque jour de la semaine (1 = Lundi, 7 = Dimanche).
const dayLabels = ['L', 'M', 'M', 'J', 'V', 'S', 'D']

// Curseur personnalisé pour assombrir la partie après le point actif.
const CustomCursor = ({ points, width, height }) => {
  if (!points || !points.length) {
    return null
  }

  const x = points[0].x
  const cursorWidth = Math.max(0, width - x)

  return (
    <Rectangle
      fill="rgba(0, 0, 0, 0.12)"
      x={x}
      y={0}
      width={cursorWidth}
      height={height}
    />
  )
}
/*      */
function AverageSessions({ sessions = [] }) {
  // Enrichit les sessions avec un libellé lisible pour l'axe des X.
  // Deux points fantômes (début et fin) permettent à la ligne de dépasser les étiquettes.
  const realData = sessions.map((session) => ({
    ...session,
    dayLabel: dayLabels[session.day - 1] ?? session.day,
  }))
  const chartData = [
    { dayLabel: '', sessionLength: realData[0]?.sessionLength ?? 0 },
    ...realData,
    { dayLabel: '', sessionLength: realData[realData.length - 1]?.sessionLength ?? 0 },
  ]

  return (
    <section className="avg-sessions">
      <header className="avg-sessions__header">
        <h2>Durée moyenne des sessions</h2>
      </header>
      <div className="avg-sessions__chart">
        <div style={{ width: 'calc(100% + 60px)', marginLeft: '-30px', height: '100%' }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <defs>
              <linearGradient id="strokeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%"   stopColor="#ffffff" stopOpacity={0.2} />
                <stop offset="100%" stopColor="#ffffff" stopOpacity={1} />
              </linearGradient>
            </defs>
            {/* Axe des jours, uniquement en lettres pour garder une lecture compacte. */}
            <XAxis
              dataKey="dayLabel"
              axisLine={false}
              tickLine={false}
              stroke="rgba(255,255,255,0.7)"
            />
            {/* Axe vertical masqué, utilisé pour le domaine de la courbe. */}
            <YAxis width={0} axisLine={false} tickLine={false} tick={false} domain={['dataMin-10', 'dataMax+10']} margin={{ top: 1, right: 1, left: 1, bottom: 1 }} />
            <Tooltip
              cursor={<CustomCursor height={225} />}
              formatter={(value) => [`${value} min`, 'Durée']}
              labelFormatter={() => ''}
            />
            {/* Courbe de durée moyenne (min). */}
            <Line
              type="natural"
              dataKey="sessionLength"
              stroke="url(#strokeGradient)"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4, strokeWidth: 2, stroke: '#fff' }}
              width="150%"
            />
          </LineChart>
        </ResponsiveContainer>
        </div>
      </div>
    </section>
  )
}

export default AverageSessions
