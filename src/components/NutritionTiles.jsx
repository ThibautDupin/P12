import '../css/NutritionTiles.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faAppleWhole,
  faBurger,
  faDrumstickBite,
  faFireFlameCurved,
} from '@fortawesome/free-solid-svg-icons'

// Cartes de macros (calories, protéines, glucides, lipides).
function NutritionTiles({ keyData = {} }) {
  // Prépare les tuiles à afficher avec leur icône et unité.
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
      {/* Rend chaque tuile nutritionnelle */}
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
