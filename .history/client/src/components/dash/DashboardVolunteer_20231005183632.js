import './dashboard.css'

import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';

import Items from './Items'
import Navbar from '../navbar/Navbar';

const DashboardVolunteer = () => {
  return (
    <div className="container-fluid dashboard-main">
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light"/>
      <Navbar />
      <div className="container d-flex justify-content-center align-items-center flex-column">
        <h1 className="home-subtitle" style={{ color: 'black', marginTop: "200px"}}>
          Dashboard
        </h1>
        <Items type="volunteer"/>
      </div>
    </div>
  );
}

export default DashboardVolunteer


