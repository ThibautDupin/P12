import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import '../css/DailyActivity.css'

function DailyActivity({ sessions = [] }) {
  // Formatage des données pour le graphique (noms explicites + valeurs calculées).
  const chartData = sessions.map((session) => ({
    day: session.day,
    weight: session.kilogram,
    calories: session.calories,
  }))
  // Index affichés sur l'axe X (1..N) plutôt que les dates.
  const dayTicks = chartData.map((_, index) => index + 1)

  const hasData = chartData.length > 0

  // Calcul des limites de l'axe Y "Poids" (kg)
  const maxWeight = hasData ? Math.max(...chartData.map((entry) => entry.weight)) : 0
  const minWeight = hasData ? Math.min(...chartData.map((entry) => entry.weight)) : 0
  const minWeightFloor = Math.floor(minWeight - 1)
  const maxWeightCeil = Math.ceil(maxWeight + 1)
  const weightDomain = [minWeightFloor, maxWeightCeil]
  const midWeight = (minWeightFloor + maxWeightCeil) / 2
  // Calcul des limites de l'axe Y "Calories" (kCal).
  const maxCalories = hasData ? Math.max(...chartData.map((entry) => entry.calories)) : 0
  const minCalories = hasData ? Math.min(...chartData.map((entry) => entry.calories)) : 0
  const minCaloriesFloor = Math.floor(minCalories - 75)
  const maxCaloriesCeil = Math.ceil(maxCalories + 75)
  const caloriesDomain = [minCaloriesFloor, maxCaloriesCeil]

  return (
    <section className="activity">
      <header className="activity__header">
        <h2>Activité quotidienne</h2>
        <ul className="activity__legend">
          <li className="activity__legend-item activity__legend-item--weight">
            <span className="activity__legend-dot" aria-hidden="true" />
            Poids (kg)
          </li>
          <li className="activity__legend-item activity__legend-item--calories">
            <span className="activity__legend-dot" aria-hidden="true" />
            Calories (Kcal)
          </li>
        </ul>
      </header>
      <div className="activity__chart">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} barCategoryGap={20} barGap={10} margin={{ top: 1, right: 1, left: 1, bottom: 1 }}>
            {/* Grille horizontale en pointillés pour la lecture */}
            <CartesianGrid strokeDasharray="4 4" vertical={false} />
            <XAxis
              scale="point"
              padding={{ left: 12, right: 12 }}
              dataKey="day"
              tickLine={false}
              ticks={chartData.map((entry) => entry.day)}
              tickFormatter={(_value, index) => dayTicks[index]}
            />
            {/* Axe Y de droite pour le poids */}
            <YAxis
              margin={0}
              domain={weightDomain}
              orientation="right"
              axisLine={false}
              ticks={[minWeightFloor, midWeight, maxWeightCeil]}
              tickFormatter={(value) => Math.round(value)}
              tickLine={false}
            />
            {/* Axe Y de gauche pour les calories (ticks masqués) */}
            <YAxis
              yAxisId="calories"
              orientation="left"
              axisLine={false}
              tickLine={false}
              tick={false}
              domain={caloriesDomain}
              width={0}
            />
            {/* Tooltip customisée : affiche la valeur + unité */}
            <Tooltip
              formatter={(value, name) =>
                name === 'weight'
                  ? [value, 'Poids']
                  : [value, 'Calories']
              }
              labelFormatter={() => ''}
            />
            {/* Série Poids */}
            <Bar dataKey="weight" fill="#111827" barSize={7} radius={[4, 4, 0, 0]} />
            {/* Série Calories */}
            <Bar
              dataKey="calories"
              yAxisId="calories"
              fill="#f91616"
              barSize={7}
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  )
}

export default DailyActivity
