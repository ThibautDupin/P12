import { Link } from 'react-router-dom'
import logo from '../assets/logo.png'
import '../css/Header.css'

function Header() {
  return (
    <header className="header">
      <div className="header-logo">
        <img src={logo} alt="SportSee" />
        <span>SportSee</span>
      </div>
  <nav className="header-nav">
        <Link to="/">Accueil</Link>
        <Link to="/profil">Profil</Link>
        <Link to="/reglage">Reglage</Link>
        <Link to="/communaute">Communauté</Link>
      </nav>
    </header>
  )
}

export default Header
