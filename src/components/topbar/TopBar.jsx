import './topbar.css'
import logo from "../../Images/logo.png";
function TopBar() {
    return (
        <section id="" className='Menu-section' data-aos="fade-down">
        <div className="menu-bar">
          <nav className="Navbar Navbar-light Navbar-dark">
            <a className="Navbar-brand sizing" href="#">
              <img
                className="Navclass"
                src={logo}
                width="60"
                height="60"
                className="d-inline-block align-top"
                alt=""
              />
              SRM IST Alumni Portal
            </a>
          </nav>
        </div>
      </section>
    )
}

export default TopBar
