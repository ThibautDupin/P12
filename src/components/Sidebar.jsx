import meditationIcon from '../assets/meditation.png'
import swimIcon from '../assets/swim.png'
import bikeIcon from '../assets/bike.png'
import gymIcon from '../assets/gym.png'
import '../css/Sidebar.css'

const icons = [meditationIcon, swimIcon, bikeIcon, gymIcon]

function Sidebar() {
  return (
    <aside className="sidebar" aria-label="Navigation latérale">
      <div className="sidebar-icons">
        {icons.map((icon, index) => (
          <div key={index} className="sidebar-icon">
            <img src={icon} alt="" aria-hidden="true" />
          </div>
        ))}
      </div>
      <p className="sidebar-copyright">Copyright, SportSee 2020</p>
    </aside>
  )
}

export default Sidebar
