import './topbar.css'
import logo from "../../Images/logo.png";
function TopBar() {
    return (
        <section id="">
        <div className="menu-bar">
          <nav className="navbar navbar-light navbar-dark">
            <a className="navbar-brand sizing" href="#">
              <img
                className="navclass"
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
