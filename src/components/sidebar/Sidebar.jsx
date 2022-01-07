import "./sidebar.css";
import logo from "../../Images/logo.png";
import dashboard from "../../Images/dashboard_white_24dp.svg";
import { useContext, useState } from "react";
import { Context } from "../../context/Context";
import { Link } from "react-router-dom";
function Sidebar() {
    const {user,dispatch}=useContext(Context);
  const [icon, setIcon] = useState("fas fa-caret-down");
  const [dropdown, setDropdown] = useState("dropdown");
  const handleIcon = () => {
    if (icon === "fas fa-caret-down") {
      setIcon("fas fa-caret-up");
      setDropdown("dropdown-active");
    } else {
      setIcon("fas fa-caret-down");
      setDropdown("dropdown");
    }
  };
  const logout=()=>{
    dispatch({ type: "LOGIN_FAILURE" }); 
    localStorage.removeItem('token')}
  }
  return (
    <div className="Sidebar Col-lg-16">
      <div className="Sidebar-container">
        <div className="Sidebar-wrapper">
          <ul className="Sidebar-ul ">
            <li className="Sidebar-li Sidebar-logo-1 ">
              <div className="logo-group Row">
                <div className="Sidebar-logo Col-lg-20">
                  <img src={logo} alt="" />
                </div>
                <div className="Sidebar-content Col-lg-70">SRM Alumni</div>
              </div>
            </li>

            <li className="Sidebar-li profile">
              <div
                onClick={() => {
                  handleIcon();
                }}
                className="profile-group Row"
              >
                <div className="Sidebar-profile Col-lg-20">
                  <img
                    src={"/images/"+user.photo}
                    alt=""
                  />
                </div>
                <div className="Sidebar-profile-content Col-lg-70">
                  {user.name}
                </div>
                <div className="Sidebar-icon Col-lg-10">
                  <i class={icon}></i>
                </div>
              </div>
            </li>
            <ul className={dropdown}>
            <Link className="link" to="/profile">
              <li className="dropdownItem Row">
                 
                <div className="dropdown-icon Col-lg-20">
                  <i class="far fa-user"></i>
                </div>
                <div className="dropdown-Content Col-lg-70">Profile</div>
                
              </li>
              </Link>
              <Link className="link" to="/profile">
              <li className="dropdownItem Row">
                <div className="dropdown-icon Col-lg-20">
                <i class="fas fa-cog"></i>
                </div>
                <div className="dropdown-Content Col-lg-70">Settings</div>
              </li>
              </Link>
              <Link onClick={logout } className="link" to="/">
              <li className="dropdownItem Row">
                <div className="dropdown-icon Col-lg-20">
                  <i class="fas fa-sign-out-alt"></i>
                </div>
                <div className="dropdown-Content Col-lg-70">Logout</div>
              </li>
              </Link>
            </ul>
          </ul>
          <Link className="link" to="/">
          <li className="Sidebar-li ">
            <div className="profile-group Row">
              <div className="Sidebar-profile Col-lg-20">
                <img src={dashboard} alt="" />
              </div>
              <div className="Sidebar-profile-content Col-lg-70">Dashboard</div>
              <div className="Sidebar-icon Col-lg-10"></div>
            </div>
          </li>
          </Link>
          <li className='Sidebar-li '>
                   <div  className="profile-group Row">
                       <div className="Sidebar-profile Col-lg-20">
                       <i class="fas fa-user-friends"></i>
                            </div>
                            <div className="Sidebar-profile-content Col-lg-70">
                                Connections
                            </div>
                            <div className="Sidebar-icon Col-lg-10">
                            
                            </div>
                       </div>
          </li>
          <li className='Sidebar-li '>
                   <div  className="profile-group Row">
                       <div className="Sidebar-profile Col-lg-20">
                       <i class="fas fa-users"></i>
                            </div>
                            <div className="Sidebar-profile-content Col-lg-70">
                                Groups/Club
                            </div>
                            <div className="Sidebar-icon Col-lg-10">
                            
                            </div>
                       </div>
          </li>
          <li className='Sidebar-li '>
                   <div  className="profile-group Row">
                       <div className="Sidebar-profile Col-lg-20">
                       <i class="fas fa-people-arrows"></i>
                            </div>
                            <div className="Sidebar-profile-content Col-lg-70">
                                Mentoring
                            </div>
                            <div className="Sidebar-icon Col-lg-10">
                            
                            </div>
                       </div>
          </li>
          <li className='Sidebar-li '>
                   <div  className="profile-group Row">
                       <div className="Sidebar-profile Col-lg-20">
                       <i class="fas fa-building"></i>
                            </div>
                            <div className="Sidebar-profile-content Col-lg-70">
                                Opportunity
                            </div>
                            <div className="Sidebar-icon Col-lg-10">
                            
                            </div>
                       </div>
          </li>
          <li className='Sidebar-li '>
                   <div  className="profile-group Row">
                       <div className="Sidebar-profile Col-lg-20">
                       <i class="far fa-sticky-note"></i>
                            </div>
                            <div className="Sidebar-profile-content Col-lg-70">
                                Resources
                            </div>
                            <div className="Sidebar-icon Col-lg-10">
                            
                            </div>
                       </div>
          </li>
          <li className='Sidebar-li '>
                   <div  className="profile-group Row">
                       <div className="Sidebar-profile Col-lg-20">
                       <i class="fas fa-code"></i>
                            </div>
                            <div className="Sidebar-profile-content Col-lg-70">
                                Let's Code
                            </div>
                            <div className="Sidebar-icon Col-lg-10">
                            
                            </div>
                       </div>
          </li>
          <li className='Sidebar-li '>
                   <div  className="profile-group Row">
                       <div className="Sidebar-profile Col-lg-20">
                       <i class="fas fa-graduation-cap"></i>
                            </div>
                            <div className="Sidebar-profile-content Col-lg-70">
                                Scholarships
                            </div>
                            <div className="Sidebar-icon Col-lg-10">
                            
                            </div>
                       </div>
          </li>
          <li className='Sidebar-li '>
                   <div  className="profile-group Row">
                       <div className="Sidebar-profile Col-lg-20">
                       <i class="fas fa-calendar-week"></i>
                            </div>
                            <div className="Sidebar-profile-content Col-lg-70">
                                Events
                            </div>
                            <div className="Sidebar-icon Col-lg-10">
                            
                            </div>
                       </div>
          </li>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
