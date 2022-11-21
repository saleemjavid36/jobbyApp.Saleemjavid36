import {AiOutlineHome} from 'react-icons/ai'
import {BsBriefcase} from 'react-icons/bs'
import {FiLogOut} from 'react-icons/fi'
import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'

import './index.css'

const Header = props => {
  const onClickLagout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <nav className="nav-header">
      <div className="nav-bar-mobile-logo-container">
        <Link to="/">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="website-logo"
          />
        </Link>
        <div className="navbar-icons-container">
          <Link to="/">
            <AiOutlineHome size="35" color="white" />
          </Link>
          <Link to="jobs">
            <BsBriefcase size="35" color="white" />
          </Link>

          <button
            type="button"
            className="mobile-button"
            onClick={onClickLagout}
          >
            <FiLogOut size="35" color="white" />
          </button>
        </div>
      </div>
      <div className="desktop-container">
        <Link to="/">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="website-logo"
          />
        </Link>

        <ul className="desktop-nav-menu">
          <li className="nav-item">
            <Link to="/" className="nav-link">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/jobs" className="nav-link">
              Jobs
            </Link>
          </li>
        </ul>
        <button type="button" className="logout-button" onClick={onClickLagout}>
          Lagout
        </button>
      </div>
    </nav>
  )
}

export default withRouter(Header)
