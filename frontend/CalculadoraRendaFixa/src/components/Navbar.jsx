import './Navbar.css'
import { Link } from 'react-router-dom'

function Navbar() {

  return (
    <header className='navbar'>
      <div className='navbar-conteudo'>
        {/* Logo / Titulo */}
        <Link to='/' className='navbar-logo'>📈 Renda Fixa</Link>

        {/* Links de navegação do menu */}
        <nav className='navbar-links'>
            <Link to='/' className='navbar-link'>🧮 Calculadora</Link>
            <Link to='sobre' className='navbar-link'>⚠️ Sobre</Link>
        </nav>
      </div>
    </header>
  )
}

export default Navbar