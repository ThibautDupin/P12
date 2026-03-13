import '../css/NutritionTiles.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faAppleWhole,
  faBurger,
  faDrumstickBite,
  faFireFlameCurved,
} from '@fortawesome/free-solid-svg-icons'
// Version importée (désactivée pour le mock local)
// import dataSource from '../../data.js'
// const { USER_MAIN_DATA } = dataSource

// Mock local - utilisateur 12
const USER_MAIN_DATA = [
  {
    id: 12,
    keyData: {
      calorieCount: 1930,
      proteinCount: 155,
      carbohydrateCount: 290,
      lipidCount: 50,
    },
  },
]

function NutritionTiles() {
  const user = USER_MAIN_DATA?.find((entry) => entry.id === 12)
  const keyData = user?.keyData ?? {}

  const tiles = [
    {
      label: 'Calories',
      value: keyData.calorieCount,
      unit: 'kCal',
      className: 'nutrition-tiles__tile--calories',
      icon: faFireFlameCurved,
    },
    {
      label: 'Protéines',
      value: keyData.proteinCount,
      unit: 'g',
      className: 'nutrition-tiles__tile--proteins',
      icon: faDrumstickBite,
    },
    {
      label: 'Glucides',
      value: keyData.carbohydrateCount,
      unit: 'g',
      className: 'nutrition-tiles__tile--carbs',
      icon: faAppleWhole,
    },
    {
      label: 'Lipides',
      value: keyData.lipidCount,
      unit: 'g',
      className: 'nutrition-tiles__tile--lipids',
      icon: faBurger,
    },
  ]

  return (
    <section className="nutrition-tiles">
      {tiles.map((tile) => (
        <article key={tile.label} className={`nutrition-tiles__tile ${tile.className}`}>
          <div className="nutrition-tiles__icon" aria-hidden="true">
            <FontAwesomeIcon icon={tile.icon} />
          </div>
          <div className="nutrition-tiles__content">
            <div className="nutrition-tiles__value">
              {tile.value}
              <span className="nutrition-tiles__unit">{tile.unit}</span>
            </div>
            <div className="nutrition-tiles__label">{tile.label}</div>
          </div>
        </article>
      ))}
    </section>
  )
}

export default NutritionTiles
