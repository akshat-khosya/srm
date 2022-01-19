import "./navbar.css";
import { useState } from "react";
import home from '../../Images/home_black_24dp.svg'
import { Link, useLocation } from "react-router-dom";
function Navbar() {
    const location = useLocation();
    
   
    
  return (
    <div className="Navbar Navbaractive">
      <div className="Navbar-container ">
        <div className="Navbar-navigation">
          <div className="navigation-group">
            <div className="naviagtion-home">
                <Link className="link" to="/">
              <img src={home} alt="" />
              </Link>
            </div>
         
          </div>
          <div className="navigation-group">
            <div className="naviagtion-humburger">
            <i className="fas fa-bars"></i>
            </div>
          </div>
        </div>
        <div className="Navbar-user">
            <form>
                <div className="navbar-input">
                <input className="navbarInput" type="text" id="search"  />
                <label className="navbarLabel" htmlFor="search">Search</label>
                </div>
                
            </form>
            <div className="navbar-user__icons">
            <i className="far fa-envelope"></i>
            </div>
            <div className="navbar-user__icons">
            <i className="far fa-bell"></i>
            </div>
            
            
        </div>
      </div>
    </div>
  );
}

export default Navbar;
