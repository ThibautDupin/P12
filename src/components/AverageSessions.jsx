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
// import dataSource from '../../data.js'
// const { USER_AVERAGE_SESSIONS } = dataSource
// const userAverageSessions = USER_AVERAGE_SESSIONS?.find((entry) => entry.userId === 12)
// const userSessions = userAverageSessions?.sessions ?? []
const userSessions = [
  { day: 1, sessionLength: 30 },
  { day: 2, sessionLength: 23 },
  { day: 3, sessionLength: 45 },
  { day: 4, sessionLength: 50 },
  { day: 5, sessionLength: 0 },
  { day: 6, sessionLength: 0 },
  { day: 7, sessionLength: 60 },
]
const dayLabels = ['L', 'M', 'M', 'J', 'V', 'S', 'D']

const chartData = userSessions.map((session) => ({
  ...session,
  dayLabel: dayLabels[session.day - 1] ?? session.day,
}))
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
function AverageSessions() {
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
