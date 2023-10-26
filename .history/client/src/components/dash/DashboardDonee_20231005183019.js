import './dashboard.css'

import React, { useState } from 'react'

import AddPopup from './AddPopup'
import Items from './Items'
import Navbar from '../navbar/Navbar';

const DashboardDonee = () => {
  
  const [addPopup, setAddPopup] = useState(false)



  return (
    <div className="container-fluid dashboard-main">
      <Navbar />
      <div className="dashboard-container d-flex justify-content-center align-items-center flex-column">
        <h1 className="home-subtitle" style={{ color: 'black', marginTop: "200px"}}>
          Dashboard
        </h1>
        <Items type="donee"/>
      </div>
    </div>
  );
}

export default DashboardDonee


