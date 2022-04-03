import './topbar.css'
import logo from "../../Images/logo.png";
import { Link } from 'react-router-dom';
function TopBar() {
    return (
        <section id="" className='Menu-section' data-aos="fade-down">
        <div className="menu-bar">
          <nav className="Navbar Navbar-light Navbar-dark">
            <Link className="Navbar-brand sizing" to="/profile">
              <img
                className="Navclass"
                src={logo}
                width="60"
                height="60"
                alt="User Profile"
              />
              SRM IST Alumni Portal
            </Link>
          </nav>
        </div>
      </section>
    )
}

export default TopBar
