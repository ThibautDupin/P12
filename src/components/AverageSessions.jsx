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
const dayLabels = ['L', 'M', 'M', 'J', 'V', 'S', 'D']

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
        <ResponsiveContainer width={500} height={500}>
          <LineChart data={chartData}>
            <XAxis
              dataKey="dayLabel"
              axisLine={false}
              tickLine={false}
              stroke="rgba(255,255,255,0.7)"
            />
            <YAxis width={0} axisLine={false} tickLine={false} tick={false} domain={['dataMin-10', 'dataMax+10']} margin={{ top: 0, right: 0, left: 0, bottom: 0 }} />
            <Tooltip
              cursor={<CustomCursor height={500} />}
              formatter={(value) => [`${value} min`, 'Durée']}
              labelFormatter={() => ''}
            />
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
