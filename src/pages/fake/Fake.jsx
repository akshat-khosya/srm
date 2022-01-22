import React from "react";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import "./fake.css";
function Fake() {
  return (
    <div className="home">
      <div className="Row">
        <Sidebar />
        <div className="Col-lg-83 Col-md-100">
          <div className="home-main">
            <Navbar />
            <div className="home-container">
              <div className="fake">
                We are coming soon.
                <br />
                <span>Stay Connected...</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Fake;
