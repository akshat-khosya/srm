import React from 'react';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import Oppoform from './Oppoform';
function Opportunity() {
  return (
    <div className="home">
    <div className="Row">
      <Sidebar />
      <div className="Col-lg-83 Col-md-100">
        <div className="home-main">
          <Navbar />
          <div className="home-container">
             <Oppoform />
          </div>
        </div>
      </div>
    </div>
  </div>
  );
}

export default Opportunity;
