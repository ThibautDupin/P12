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
  const chartData = sessions.map((session) => ({
    ...session,
    dayLabel: dayLabels[session.day - 1] ?? session.day,
  }))

  return (
    <section className="avg-sessions">
      {/* <header className="avg-sessions__header">
        <h2>Durée moyenne des sessions</h2>
      </header> */}
      <div className="avg-sessions__chart">
        <ResponsiveContainer width={280} height={280}>
          <LineChart data={chartData}>
            {/* Axe des jours, uniquement en lettres pour garder une lecture compacte. */}
            <XAxis
              dataKey="dayLabel"
              axisLine={false}
              tickLine={false}
              stroke="rgba(255,255,255,0.7)"
            />
            {/* Axe vertical masqué, utilisé pour le domaine de la courbe. */}
            <YAxis width={0} axisLine={false} tickLine={false} tick={false} domain={['dataMin-10', 'dataMax+10']} margin={{ top: 0, right: 0, left: 0, bottom: 0 }} />
            <Tooltip
              cursor={<CustomCursor height={250} />}
              formatter={(value) => [`${value} min`, 'Durée']}
              labelFormatter={() => ''}
            />
            {/* Courbe de durée moyenne (min). */}
            <Line
              type="monotone"
              dataKey="sessionLength"
              stroke="#ffffff"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4, strokeWidth: 2, stroke: '#fff' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </section>
  )
}

export default AverageSessions
