import './dashboard.css'

import React, { useEffect, useState } from 'react'

import Items from './Items'
import Navbar from '../navbar/Navbar';

const DashboardVolunteer = () => {

  return (
    <div className="container-fluid dashboard-main">
      <Navbar />
      <div className="container d-flex justify-content-center align-items-center flex-column">
        <h1 className="home-subtitle text-center" style={{ color: 'black', marginTop: "200px"}}>
          Volunteer Dashboard
        </h1>
        <h3 className="dashboard-section-text mt-5">Your Items</h3>
        <Items type="volunteer"/>
        <h3 className="dashboard-section-text mt-5">Your Stats</h3>
        <div className="row">
          <div className="rating-widget col-6">
            5 Stars
          </div>
          <div className="service-hours-widget col-6">

          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardVolunteer


