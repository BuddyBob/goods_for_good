import './dashboard.css'

import React, { useEffect, useState } from 'react'

import Items from './Items'
import Navbar from '../navbar/Navbar';

const DashboardVolunteer = () => {

  return (
    <div className="container-fluid dashboard-main">
      <Navbar />
      <div className="container d-flex justify-content-left align-items-left flex-column">
        <h1 className="home-subtitle text-left mb-5" style={{ color: 'black', marginLeft: "120px", marginTop: "200px"}}>
          Volunteer Dashboard
        </h1>
        <div className="container dashboard-sub d-flex justify-content-center align-items-center flex-column mb-5">
          <h3 className="dashboard-section-text mt-5">Your Items</h3>
          <Items type="volunteer"/>
          <h3 className="dashboard-section-text">Your Stats</h3>
          <div className="row mb-5">
            <div className="container rating-widget col-6">
              <div className="rating-widget-value">
                <h3 className="rating-widget-value-text">4.5</h3>
              </div>
              <div className="rating-widget-title">
                <div className="rating-widget-title">
                  <h3 className="rating-widget-title-text text-center">Average Rating</h3>
                </div>
              </div>
            </div>
            <div className="container rating-widget col-6">
              <div className="rating-widget-value ">
                <h3 className="rating-widget-value-text ">4.5</h3>
              </div>
              <div className="rating-widget-title">
                <div className="rating-widget-title">
                  <h3 className="rating-widget-title-text text-center">Average Rating</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardVolunteer


