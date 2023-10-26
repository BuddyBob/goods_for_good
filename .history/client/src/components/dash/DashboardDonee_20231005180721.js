import './dashboard.css'

import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';

import AddPopup from './AddPopup'
import Items from './Items'
import Navbar from '../navbar/Navbar';

const DashboardDonee = () => {
  
  const [addPopup, setAddPopup] = useState(false)
  const successNoti = () => toast("Item successfully uploaded");


  function closePopup() {
    setAddPopup(false)
    successNoti()
  }

  return (
    <div className="container-fluid dashboard-main">
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light"/>
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


